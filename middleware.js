
import { DIMPOO_LOGIN_PAGE as LOGIN_PAGE } from "./login-dimpoo.js";

export const config = { matcher: "/:path*" };

const COOKIE = "sl_session";
const SESSION_HOURS = 12;
const enc = new TextEncoder();

async function sign(data, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, enc.encode(data))
  );

  let binary = "";
  signature.forEach(function(byte) {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function readCookie(request, name) {
  const all = request.headers.get("cookie") || "";
  const item = all.split(/;\s*/).find(function(cookie) {
    return cookie.startsWith(name + "=");
  });

  return item ? decodeURIComponent(item.slice(name.length + 1)) : null;
}

async function sessionUser(request, secret, users) {
  const value = readCookie(request, COOKIE);
  if (!value) return null;

  const parts = value.split(".");
  const user = parts[0];
  const expiry = parts[1];
  const signature = parts[2];

  if (!user || !expiry || !signature) return null;
  if (Date.now() > Number(expiry) || !users.includes(user)) return null;

  const expected = await sign(user + "." + expiry, secret);
  return expected === signature ? user : null;
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders
    }
  });
}

const strip = html => html
  .replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, " ")
  .replace(/<(br|\/p|\/li|\/h\d|\/div|\/article|\/section)\b[^>]*>/gi, "\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
  .replace(/&ndash;|&mdash;/g, "–")
  .replace(/[ \t]+/g, " ")
  .replace(/\n\s*\n+/g, "\n")
  .trim();

async function portfolio(request) {
  const raw = new URL(request.url).searchParams.get("url") || "";
  let target;

  try {
    target = new URL(raw);
  } catch {
    return json({
      ok: false,
      error: "Enter a full address, like https://your-site.com"
    }, 400);
  }

  const host = target.hostname.toLowerCase();

  if (
    target.protocol !== "https:" ||
    host === "localhost" ||
    /^[\d.]+$/.test(host) ||
    host.includes(":") ||
    !host.includes(".")
  ) {
    return json({
      ok: false,
      error: "Use your portfolio’s https:// address."
    }, 400);
  }

  try {
    const response = await fetch(target.toString(), {
      headers: { "User-Agent": "Shortlist portfolio sync" },
      redirect: "follow",
      signal: AbortSignal.timeout(12000)
    });

    if (!response.ok) {
      return json({
        ok: false,
        error: "Your portfolio answered with error " + response.status + "."
      }, 502);
    }

    const html = (await response.text())
      .slice(0, 8000000)
      .replace(/data:[^"')\s]{200,}/g, "");

    const text = strip(html).slice(0, 60000);

    if (text.length < 40) {
      return json({
        ok: false,
        error: "Couldn’t find readable text on that page."
      }, 422);
    }

    return json({
      ok: true,
      url: response.url || target.toString(),
      text,
      fetched: new Date().toISOString()
    });
  } catch {
    return json({
      ok: false,
      error: "Couldn’t reach your portfolio. Check the address and try again."
    }, 502);
  }
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Allow the song and lyrics to load before authentication.
  // These files must exist in your deployed site's public root.
  if (
    request.method === "GET" &&
    (path === "/vimlesh.mp3" || path === "/lyrics.txt")
  ) {
    return new Response(null, {
      headers: {
        "x-middleware-next": "1",
        "Cache-Control": "public, max-age=3600"
      }
    });
  }

  const password = process.env.SITE_PASSWORD;
  const users = (process.env.SITE_USERS || "")
    .split(",")
    .map(user => user.trim().toLowerCase())
    .filter(Boolean);

  if (!password || !users.length) {
    return new Response(
      "Site locked: add SITE_USERS and SITE_PASSWORD in Vercel, then redeploy.",
      { status: 503 }
    );
  }

  const secret = password + "|shortlist-session";

  // Login endpoint.
  if (path === "/__login" && request.method === "POST") {
    let body = {};

    try {
      body = await request.json();
    } catch {}

    const name = String(body.username || "").trim().toLowerCase();
    const submittedPassword = String(body.password || "");

    if (users.includes(name) && submittedPassword === password) {
      const expiry = Date.now() + SESSION_HOURS * 3600 * 1000;
      const signature = await sign(name + "." + expiry, secret);
      const token = name + "." + expiry + "." + signature;

      return json({ ok: true }, 200, {
        "Set-Cookie":
          COOKIE + "=" + encodeURIComponent(token) +
          "; Path=/; HttpOnly; Secure; SameSite=Strict",
        "Cache-Control": "no-store"
      });
    }

    await new Promise(resolve => setTimeout(resolve, 700));
    return json({ ok: false }, 401);
  }

  // Logout endpoint.
  if (path === "/__logout") {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
        "Set-Cookie":
          COOKIE + "=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
        "Cache-Control": "no-store"
      }
    });
  }

  const user = await sessionUser(request, secret, users);

  // Show the custom login page when there is no valid session.
  if (!user) {
    if (path === "/__whoami") return json({ ok: false }, 401);

    return new Response(LOGIN_PAGE, {
      status: 401,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  if (path === "/__whoami") {
    return json({
      user,
      owner: user === users[0] ? user : ""
    });
  }

  if (path === "/__portfolio") {
    return portfolio(request);
  }

  // Let the normal site handle authenticated requests.
  return new Response(null, {
    headers: { "x-middleware-next": "1" }
  });
}
