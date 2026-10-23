# Shortlist (Poonam)

Private resume screening and building, plus a Jobs page. Same app as the main Shortlist, with its own sign-in page, settings and data.

## Files
- `index.html`: resume tools
- `jobs.html`: jobs that fit the resume and portfolio
- `middleware.js`: sign-in and portfolio sync
- `login-dimpoo.js`: the sign-in page
- `api/`: job search and profile settings
- `vercel.json`: security settings

## Vercel → Settings → Environment Variables (then redeploy)
- `SITE_USERS` = `poonam`
- `SITE_PASSWORD` = her password
- `PORTFOLIO_URLS` = `poonam=https://www.poonamwagh113.com`
- `ADZUNA_APP_ID`, `ADZUNA_APP_KEY` = optional, her own Adzuna key

## Deploy
GitHub repo with these files at the root → Vercel project, Framework Preset "Other", no build command. Every push redeploys.
