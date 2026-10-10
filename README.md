# UIC Hydra

Website of the League of Legends team UIC Hydra (Ultra Instinct Crew, Prime League): roster, values and a contact form for scrims and applications. Live at https://uichydra.fp-labs.net.

The site has no database and no Riot API access. Everything it shows lives in [data/team.ts](data/team.ts).

## Update the roster

1. Edit [data/team.ts](data/team.ts): players, positions, Riot IDs, ranks (copied from OP.GG) and `rosterUpdatedAt`.
2. Push to `main`. The "Deploy" workflow checks the code and pushes a new image (about 3 minutes).
3. In Coolify (project `uic-hydra-site`, application `uic-hydra-site`) click **Redeploy**. Automatic deploys need the secret `COOLIFY_API_TOKEN` (see below), which is deliberately not set.

## Develop

```bash
npm install
npm run dev
```

`npm run check` runs typecheck, lint and tests; `npm run build` builds the standalone server.

## Run

Docker image `ghcr.io/panger9/uic-hydra-site` (Next.js standalone, port 3000, healthcheck `/api/health`), hosted with Coolify.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend key for the contact form (server only) |
| `CONTACT_FROM` | Sender address, must be verified in Resend |
| `CONTACT_TO` | Inbox that receives the requests |

Deploy settings in GitHub: variables `COOLIFY_URL` and `COOLIFY_APP_UUID` are set. With an additional secret `COOLIFY_API_TOKEN` (Coolify API token with the deploy permission only) the workflow would also trigger the deploy; without it, it only pushes the image.

The contact form sends from `uichydra@boellerbande.fp-labs.net` (a verified Resend domain) to `kontakt@boellerbande.fp-labs.net`. The site has no technical connection to RiftOps; the header only links to the RiftOps hub at https://riftops.fp-labs.net/hub.
