# Argasus

A privacy-first **secure operations console** for device trust, compliance, and recovery readiness. Built with React 19 and Vite.

## Features

- Live health score with an on-demand **Run health check** scan
- Interactive **policy map** covering trust bootstrapping, beacon health, control coverage, recovery, and privacy
- One-click **Export report** that downloads a timestamped JSON posture report (includes paired devices)
- **Connect a device** — generates a time-limited pairing link plus a scannable QR code; opening the link shows an approval screen. Paired devices appear in a visible **Connected devices** list with a disconnect action
- A **What Argasus does / How it works** section explaining each feature and the demo's scope
- Trust stack progress, recent activity feed, coverage matrix, and deployment runbook
- Responsive dark UI with keyboard-accessible dialogs and reduced-motion support

## Local development

```bash
pnpm install
pnpm dev
```

Open the URL Vite prints (usually <http://localhost:5173/argasus/>).

## Build

```bash
pnpm build
pnpm preview
```

The production bundle is written to `dist/`. The Vite `base` is set to `/argasus/` for GitHub Pages project hosting.

## Deployment

Deployment is automated with GitHub Actions (`.github/workflows/deploy.yml`). Every push to `main`:

1. Installs dependencies with pnpm and a frozen lockfile.
2. Runs `pnpm build`.
3. Uploads `dist/` as a Pages artifact and deploys it with `actions/deploy-pages`.

The live site is available at <https://humphreymboya.github.io/argasus/>.
