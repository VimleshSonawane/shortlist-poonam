// Shortlist sign-in and portfolio sync (Vercel Routing Middleware).
import { DIMPOO_LOGIN_PAGE as LOGIN_PAGE } from './login-dimpoo.js';
// Vercel → Project → Settings → Environment Variables:
//   SITE_USERS    = poonam
//   SITE_PASSWORD = the shared password
// Redeploy after changing either. Changing the password signs everyone out.
export const config = { matcher: '/:path*' };

const COOKIE = 'sl_session';
const SESSION_HOURS = 12;
const enc = new TextEncoder();

async function sign(data, secret) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
  let bin = ''; sig.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function readCookie(req, name) {
  const all = req.headers.get('cookie') || '';
  const hit = all.split(/;\s*/).find(c => c.startsWith(name + '='));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}
async function sessionUser(req, secret, users) {
  const v = readCookie(req, COOKIE); if (!v) return null;
  const [user, exp, sig] = v.split('.');
  if (!user || !exp || !sig || Date.now() > Number(exp) || !users.includes(user)) return null;
  return (await sign(user + '.' + exp, secret)) === sig ? user : null;
}
const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra } });

// Reads a portfolio page and returns its text, for Resume tools and the Jobs page.
const strip = html => html
  .replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<(br|\/p|\/li|\/h\d|\/div|\/article|\/section)\b[^>]*>/gi, '\n')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&lsquo;/g, "'").replace(/&ndash;|&mdash;/g, '–')
  .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
async function portfolio(request) {
  const raw = new URL(request.url).searchParams.get('url') || '';
  let target;
  try { target = new URL(raw); } catch (e) { return json({ ok: false, error: 'Enter a full address, like https://your-site.com' }, 400); }
  const host = target.hostname.toLowerCase();
  if (target.protocol !== 'https:' || host === 'localhost' || /^[\d.]+$/.test(host) || host.includes(':') || !host.includes('.')) {
    return json({ ok: false, error: 'Use your portfolio’s https:// address.' }, 400);
  }
  try {
    const r = await fetch(target.toString(), { headers: { 'User-Agent': 'Shortlist portfolio sync' }, redirect: 'follow', signal: AbortSignal.timeout(12000) });
    if (!r.ok) return json({ ok: false, error: `Your portfolio answered with error ${r.status}.` }, 502);
    const html = (await r.text()).slice(0, 8_000_000).replace(/data:[^"')\s]{200,}/g, '');
    const text = strip(html).slice(0, 60000);
    if (text.length < 40) return json({ ok: false, error: 'Couldn’t find readable text on that page.' }, 422);
    return json({ ok: true, url: r.url || target.toString(), text, fetched: new Date().toISOString() });
  } catch (e) {
    return json({ ok: false, error: 'Couldn’t reach your portfolio. Check the address and try again.' }, 502);
  }
}

export default async function middleware(request) {
  const password = process.env.SITE_PASSWORD;
  const users = (process.env.SITE_USERS || '').split(',').map(u => u.trim().toLowerCase()).filter(Boolean);
  if (!password || !users.length) {
    return new Response('Site locked: add SITE_USERS and SITE_PASSWORD in Vercel, then redeploy.', { status: 503 });
  }
  const secret = password + '|shortlist-session';
  const path = new URL(request.url).pathname;

  if (path === '/__login' && request.method === 'POST') {
    let body = {}; try { body = await request.json(); } catch (e) {}
    const name = String(body.username || '').trim().toLowerCase();
    if (users.includes(name) && String(body.password || '') === password) {
      const exp = Date.now() + SESSION_HOURS * 3600 * 1000;
      const token = name + '.' + exp + '.' + (await sign(name + '.' + exp, secret));
      // No Max-Age: the session ends when the browser closes.
      return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict` });
    }
    await new Promise(r => setTimeout(r, 700)); // slow down guessing
    return json({ ok: false }, 401);
  }
  if (path === '/__logout') {
    return new Response(null, { status: 302, headers: { Location: '/', 'Set-Cookie': `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`, 'Cache-Control': 'no-store' } });
  }

  const user = await sessionUser(request, secret, users);
  if (!user) {
    if (path === '/__whoami') return json({ ok: false }, 401);
    return new Response(LOGIN_PAGE, { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
  }
  if (path === '/__whoami') return json({ user, owner: user === users[0] ? user : '' }); // never reveal other usernames
  if (path === '/__portfolio') return portfolio(request);
  return new Response(null, { headers: { 'x-middleware-next': '1' } });
}
