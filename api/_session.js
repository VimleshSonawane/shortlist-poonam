// Reads the signed-in username from the Shortlist session cookie.
// Uses the same signing rule as middleware.js, so it only trusts cookies the middleware issued.
const crypto = require("crypto");

function sessionUser(req) {
  const password = process.env.SITE_PASSWORD;
  const users = (process.env.SITE_USERS || "").split(",").map(u => u.trim().toLowerCase()).filter(Boolean);
  if (!password || !users.length) return null;
  const raw = (req.headers.cookie || "").split(/;\s*/).find(c => c.startsWith("sl_session="));
  if (!raw) return null;
  const [user, exp, sig] = decodeURIComponent(raw.slice("sl_session=".length)).split(".");
  if (!user || !exp || !sig || Date.now() > Number(exp) || !users.includes(user)) return null;
  const good = crypto.createHmac("sha256", password + "|shortlist-session").update(user + "." + exp).digest("base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const a = Buffer.from(good), b = Buffer.from(sig);
  return a.length === b.length && crypto.timingSafeEqual(a, b) ? user : null;
}
module.exports = { sessionUser };
