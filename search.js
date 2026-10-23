// POST /api/search  { titles: ["assistant project manager", ...], where: "Boston, MA", boards: ["greenhouse:acme", ...] }
// Fetches jobs for the signed-in profile's own search terms and returns them. Nothing is stored on the server,
// so profiles never see each other's searches or results.
// Vercel → Settings → Environment Variables: ADZUNA_APP_ID, ADZUNA_APP_KEY (free at developer.adzuna.com)
const { createHash } = require("crypto");
const { sessionUser } = require("./_session");

const MAX_TITLES = 6, MAX_BOARDS = 10, MAX_DESC = 6000, MAX_JOBS = 150;
const lc = s => String(s || "").toLowerCase();

async function getJSON(url) {
  const r = await fetch(url, { headers: { "User-Agent": "shortlist-jobs/1.0" }, signal: AbortSignal.timeout(12000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " " };
const decode = s => String(s || "").replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (_, k) => ENT[k]).replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
const htmlToText = html => decode(decode(html))
  .replace(/<\s*(br|\/p|\/li|\/h\d|\/div)\s*\/?>/gi, "\n").replace(/<li[^>]*>/gi, "\n• ").replace(/<[^>]+>/g, " ")
  .replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n\n").trim();
const isHttp = u => /^https?:\/\//i.test(String(u || ""));

/* ---------- read details from the description ---------- */
function extractSalary(text) {
  const n = "(?:\\$|₹|£|€|INR\\s?|Rs\\.?\\s?)\\s?\\d{1,3}(?:,\\d{2,3})*(?:\\.\\d+)?\\s?(?:LPA|lakhs?|Cr|[kK]|L)?(?![A-Za-z])";
  const m = text.match(new RegExp(`(${n})(?:\\s*(?:-|–|—|to)\\s*(${n}))?(\\s*(?:/|per|an|a)\\s*(?:hour|hr|year|yr|annum|annually))?`, "i"));
  if (!m) return null;
  const toNum = s => { const v = Number((s.match(/\d[\d,]*(?:\.\d+)?/) || ["0"])[0].replace(/,/g, "")); return /\bk\b|\dk/i.test(s) ? v * 1000 : /l(akh|pa)?\b/i.test(s) ? v * 1e5 : /cr/i.test(s) ? v * 1e7 : v; };
  const lo = toNum(m[1]);
  return lo < 15 ? null : { text: m[0].trim(), min: lo, max: m[2] ? toNum(m[2]) : null };
}
function extractSponsorship(text) {
  const sentences = text.split(/(?<=[.!?])\s+|\n+/);
  const NO = /\b(no|not|unable to|will not|won['’]t|cannot|can['’]t|does not|doesn['’]t|do not|don['’]t|is not able to)\b[^.]{0,40}\bsponsor|without (the need for |requiring )?(current or future )?(visa |employment |h-?1b )?sponsorship|sponsorship (is )?not (available|provided|offered)/i;
  const CLEAR = /security clearance|must be a (us|u\.s\.) citizen|(us|u\.s\.) citizenship (is )?required|itar/i;
  const YES = /(visa|h-?1b|immigration) sponsorship (is |may be )?(available|provided|offered|supported)|(will|can|able to) sponsor|sponsorship (is )?available/i;
  for (const [flag, re] of [["no", NO], ["clearance", CLEAR], ["yes", YES]]) {
    const s = sentences.find(x => re.test(x));
    if (s) return { flag, note: s.trim().slice(0, 240) };
  }
  return { flag: "unknown", note: "" };
}
function extractYears(text) {
  const m = text.match(/(\d{1,2})\s*\+?\s*(?:-|–|to)?\s*(\d{1,2})?\s*\+?\s*years?(?:['’])?(?:\s+of)?[^.\n]{0,60}experience/i);
  return m ? { min: Number(m[1]), max: m[2] ? Number(m[2]) : null } : null;
}
const BENEFITS = [["401(k)", /401\s?\(?k\)?|retirement plan/i], ["Health", /medical|health (insurance|benefits|coverage)/i], ["Dental", /dental/i],
  ["Vision", /vision (insurance|coverage|plan)|\bvision\b,/i], ["PTO", /paid time off|\bpto\b|vacation/i], ["Parental leave", /parental leave|maternity|paternity/i],
  ["Tuition help", /tuition|education assistance|learning stipend/i], ["Bonus", /\bbonus/i], ["Equity", /equity|stock options|\brsu/i], ["Relocation", /relocation/i]];
const workplace = (text, loc) => { const t = lc(loc + " " + text.slice(0, 1500)); return /\bhybrid\b/.test(t) ? "Hybrid" : /\bremote\b/.test(t) ? "Remote" : "On-site"; };

function makeJob({ source, company, title, location, url, description, posted, salary }) {
  const desc = String(description || "").slice(0, MAX_DESC);
  return {
    id: createHash("sha1").update(lc(`${company}|${title}|${location}`)).digest("hex").slice(0, 12),
    source, company: company || "", title: title || "", location: location || "",
    url: isHttp(url) ? url : "", posted: posted ? new Date(posted).toISOString() : null,
    salary: salary || extractSalary(desc), sponsorship: extractSponsorship(desc), years: extractYears(desc),
    benefits: BENEFITS.filter(([, re]) => re.test(desc)).map(([b]) => b), workplace: workplace(desc, location),
    descriptionTruncated: source === "adzuna", description: desc
  };
}

/* ---------- sources ---------- */
const COUNTRIES = { us: "$", in: "₹", gb: "£", ca: "$", au: "$", nz: "$", sg: "$", za: "R", de: "€", nl: "€", fr: "€", es: "€", it: "€", at: "€", be: "€", ch: "CHF ", pl: "zł ", mx: "$", br: "R$" };
async function adzuna(title, where, country) {
  const id = process.env.ADZUNA_APP_ID, key = process.env.ADZUNA_APP_KEY;
  if (!id || !key) throw new Error("Adzuna key not set in Vercel");
  const p = new URLSearchParams({ app_id: id, app_key: key, what_phrase: title, where, distance: "40", max_days_old: "14", results_per_page: "40", "content-type": "application/json" });
  const j = await getJSON(`https://api.adzuna.com/v1/api/jobs/${country}/search/1?${p}`);
  return (j.results || []).map(r => makeJob({
    source: "adzuna", company: r.company?.display_name, title: decode(r.title).replace(/<[^>]+>/g, ""), location: r.location?.display_name,
    url: r.redirect_url, description: htmlToText(r.description), posted: r.created,
    salary: r.salary_min ? { text: `${COUNTRIES[country]}${Math.round(r.salary_min).toLocaleString(country === "in" ? "en-IN" : "en-US")}${r.salary_max && r.salary_max !== r.salary_min ? " – " + COUNTRIES[country] + Math.round(r.salary_max).toLocaleString(country === "in" ? "en-IN" : "en-US") : ""}${r.salary_is_predicted === "1" ? " (estimate)" : ""}`, min: r.salary_min, max: r.salary_max || null } : null
  }));
}
const BOARDS = {
  async greenhouse(t) {
    const j = await getJSON(`https://boards-api.greenhouse.io/v1/boards/${t}/jobs?content=true`);
    return (j.jobs || []).map(x => makeJob({ source: "greenhouse", company: x.company_name || t, title: x.title, location: x.location?.name, url: x.absolute_url, description: htmlToText(x.content), posted: x.first_published || x.updated_at }));
  },
  async lever(t) {
    const j = await getJSON(`https://api.lever.co/v0/postings/${t}?mode=json`);
    return (Array.isArray(j) ? j : []).map(x => {
      const sr = x.salaryRange, per = /hour/i.test(sr?.interval) ? " per hour" : /month/i.test(sr?.interval) ? " per month" : /year/i.test(sr?.interval) ? " per year" : "";
      return makeJob({ source: "lever", company: t, title: x.text, location: x.categories?.location, url: x.hostedUrl,
        description: [x.descriptionPlain, ...(x.lists || []).map(l => `${l.text}\n${htmlToText(l.content)}`), x.additionalPlain].filter(Boolean).join("\n\n"), posted: x.createdAt,
        salary: sr?.min ? { text: `$${sr.min.toLocaleString("en-US")}${sr.max ? " – $" + sr.max.toLocaleString("en-US") : ""}${per}`, min: sr.min, max: sr.max || null } : null });
    });
  },
  async ashby(t) {
    const j = await getJSON(`https://api.ashbyhq.com/posting-api/job-board/${t}?includeCompensation=true`);
    return (j.jobs || []).map(x => { const c = x.compensation?.compensationTierSummary;
      return makeJob({ source: "ashby", company: t, title: x.title, location: x.location, url: x.jobUrl, description: x.descriptionPlain || htmlToText(x.descriptionHtml), posted: x.publishedAt, salary: c ? { text: c, min: null, max: null } : null }); });
  }
};

/* ---------- handler ---------- */
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!sessionUser(req)) return res.status(401).json({ ok: false, error: "Sign in again." });
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Use POST." });
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const titles = [...new Set((Array.isArray(body.titles) ? body.titles : []).map(t => lc(t).replace(/[^a-z0-9 &/+-]/g, " ").replace(/\s+/g, " ").trim()).filter(t => t.length > 2))].slice(0, MAX_TITLES);
  const country = COUNTRIES[lc(body.country)] ? lc(body.country) : "us";
  const where = String(body.where || "").replace(/[^A-Za-z0-9 ,.-]/g, "").slice(0, 60);
  const boards = [...new Set((Array.isArray(body.boards) ? body.boards : []).map(lc))]
    .map(b => b.match(/^(greenhouse|lever|ashby):([a-z0-9][a-z0-9-]{0,60})$/)).filter(Boolean).slice(0, MAX_BOARDS);
  if (!titles.length) return res.status(400).json({ ok: false, error: "Add at least one job title to search for." });

  const notes = [];
  const tasks = [
    ...titles.map(t => adzuna(t, where, country).catch(e => { notes.push(`Adzuna “${t}”: ${e.message}`); return []; })),
    ...boards.map(([, kind, t]) => BOARDS[kind](t).catch(e => { notes.push(`${kind} board “${t}”: ${e.message}. Check the name.`); return []; }))
  ];
  const all = (await Promise.all(tasks)).flat();
  const wanted = j => titles.some(t => t.split(" ").filter(w => w.length > 2).every(w => lc(j.title).includes(w)));

  const byId = new Map();
  for (const j of all) {
    if (!j.title || (j.source !== "adzuna" && !wanted(j))) continue;
    const prev = byId.get(j.id);
    if (!prev || (prev.descriptionTruncated && !j.descriptionTruncated)) byId.set(j.id, j);
  }
  const jobs = [...byId.values()].sort((a, b) => new Date(b.posted || 0) - new Date(a.posted || 0)).slice(0, MAX_JOBS);
  res.status(200).json({ ok: true, fetched: new Date().toISOString(), jobs, notes });
};
