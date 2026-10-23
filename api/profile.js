// Returns the signed-in user's own portfolio address, and nothing about other users.
// Vercel → Settings → Environment Variables:
//   PORTFOLIO_URLS = vimlesh=https://vimleshsonawane.com,poonam=https://www.poonamwagh113.com,ritika=https://www.reteeka0515.com
const { sessionUser } = require("./_session");

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const user = sessionUser(req);
  if (!user) return res.status(401).json({ ok: false, reason: "Sign-in check failed. Sign out and sign in again." });
  const raw = process.env.PORTFOLIO_URLS || "";
  if (!raw.trim()) return res.status(200).json({ ok: true, user, portfolio: null, reason: "PORTFOLIO_URLS isn’t set in Vercel (or the site wasn’t redeployed after adding it)." });
  const map = {};
  for (const pair of raw.split(",")) {
    const i = pair.indexOf("=");
    if (i > 0) map[pair.slice(0, i).trim().toLowerCase()] = pair.slice(i + 1).trim();
  }
  if (!map[user]) return res.status(200).json({ ok: true, user, portfolio: null, reason: `PORTFOLIO_URLS has no entry for “${user}”. Check the spelling matches SITE_USERS.` });
  if (!/^https:\/\//i.test(map[user])) return res.status(200).json({ ok: true, user, portfolio: null, reason: `The portfolio address for “${user}” must start with https://` });
  res.status(200).json({ ok: true, user, portfolio: map[user] });
};
