import { useEffect, useState } from 'react'
import './App.css'

const APP_NAME = 'Argasus'

const metrics = [
  { label: 'Healthy endpoints', value: '2,486', trend: '+6.3%' },
  { label: 'Policy drift', value: '14', trend: '-2.1%' },
  { label: 'Threats blocked', value: '427', trend: '+18%' },
  { label: 'Mean response', value: '142 ms', trend: '-11 ms' },
]

const pillars = [
  { name: 'Identity assurance', detail: 'Strong MFA, device attestation, and short-lived tokens.', progress: 94 },
  { name: 'Endpoint hardening', detail: 'Verified baselines, patch automation, and safe configuration drift detection.', progress: 89 },
  { name: 'Zero-trust routing', detail: 'Least-privilege access through policy-based segmentation and validation.', progress: 91 },
  { name: 'Encrypted telemetry', detail: 'Consent-based diagnostics protected at rest and in transit.', progress: 96 },
]

const initialActivity = [
  { time: '08:14', title: 'Firmware verification', note: 'Edge cluster passed attestation and key rotation check.' },
  { time: '08:07', title: 'Policy sync', note: 'Three enforcement profiles reconciled without drift.' },
  { time: '07:52', title: 'Access review', note: 'Revoked stale tokens from the prior maintenance window.' },
  { time: '07:41', title: 'Incident triage', note: 'Autonomous response isolated a blocked automation job.' },
]

const matrix = [
  ['Trust Bootstrapping', 'Pinned certificates, signed manifests, device identity proofing'],
  ['Beacon Health', 'Consent-based heartbeat with secure transport and retries'],
  ['Control Coverage', 'Patch state, firewall posture, policy compliance, and recovery paths'],
  ['Recovery', 'Rollback plan, staged deployment, and audit trail for every action'],
  ['Privacy', 'Data minimization, retention limits, and explicit operator consent'],
]

const runbook = [
  'Generate and verify the deployment keypair and identity chain.',
  'Register the trusted environment and enforce device compliance checks.',
  'Deploy the control plane and confirm encrypted health beacons are flowing.',
  'Run a compliance sweep and validate isolation and recovery logic.',
  'Open the console, verify alerts, and document the signed operator runbook.',
]

function currentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

function App() {
  const [healthScore, setHealthScore] = useState(98.4)
  const [activity, setActivity] = useState(initialActivity)
  const [lastChecked, setLastChecked] = useState(null)
  const [checking, setChecking] = useState(false)
  const [policyOpen, setPolicyOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3800)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!policyOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setPolicyOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [policyOpen])

  function notify(message, tone = 'success') {
    setToast({ message, tone, id: Date.now() })
  }

  function runHealthCheck() {
    if (checking) return
    setChecking(true)
    window.setTimeout(() => {
      const nextScore = Number((98 + Math.random() * 0.9).toFixed(1))
      const time = currentTime()
      setHealthScore(nextScore)
      setLastChecked(time)
      setActivity((previous) => [
        {
          time,
          title: 'Health check complete',
          note: `Full posture scan finished at ${nextScore.toFixed(1)}% — all controls responsive.`,
          fresh: true,
        },
        ...previous.map((item) => ({ ...item, fresh: false })),
      ].slice(0, 6))
      setChecking(false)
      notify('Health check complete — all systems nominal')
    }, 1300)
  }

  function exportReport() {
    const now = new Date()
    const report = {
      product: APP_NAME,
      report: 'Security posture report',
      generatedAt: now.toISOString(),
      healthScore: `${healthScore.toFixed(1)}%`,
      lastChecked: lastChecked ?? 'Not yet run',
      metrics,
      trustStack: pillars,
      coverageMatrix: matrix.map(([capability, control]) => ({ capability, control })),
      recentActivity: activity.map(({ time, title, note }) => ({ time, title, note })),
    }
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `argasus-report-${now.toISOString().slice(0, 10)}.json`
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    notify('Report exported as JSON')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-group">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="brand-name">{APP_NAME}</p>
            <span className="brand-subtitle">Secure operations console</span>
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <a href="#overview">Overview</a>
          <a href="#controls">Controls</a>
          <a href="#coverage">Coverage</a>
          <a href="#runbook">Runbook</a>
        </nav>

        <button type="button" className="ghost-button" onClick={exportReport}>
          Export report
        </button>
      </header>

      <main className="dashboard" id="overview">
        <section className="hero panel">
          <div className="hero-copy">
            <p className="eyebrow">Secure operations platform</p>
            <h1>Device trust, compliance, and recovery at a glance.</h1>
            <p className="lede">
              {APP_NAME} gives operators a consent-based view of endpoint health, policy
              compliance, and live recovery readiness — without unsafe collection behavior.
            </p>

            <div className="cta-row">
              <button
                type="button"
                className="primary-button"
                onClick={runHealthCheck}
                disabled={checking}
              >
                {checking ? <span className="spinner" aria-hidden="true" /> : null}
                {checking ? 'Scanning…' : 'Run health check'}
              </button>
              <button type="button" className="secondary-button" onClick={() => setPolicyOpen(true)}>
                View policy map
              </button>
            </div>
          </div>

          <div className="score-panel" aria-label="Platform health score">
            <div
              className="ring"
              style={{ background: `conic-gradient(#66e3d0 0deg ${healthScore * 3.6}deg, rgba(148, 163, 184, 0.15) ${healthScore * 3.6}deg 360deg)` }}
            >
              <div className="ring-inner">
                <strong>{healthScore.toFixed(1)}%</strong>
                <span>healthy</span>
              </div>
            </div>

            <ul className="mini-stats">
              <li>
                <span>Signed updates</span>
                <strong>100%</strong>
              </li>
              <li>
                <span>Recovery ready</span>
                <strong>11 min</strong>
              </li>
              <li>
                <span>Alerts reviewed</span>
                <strong>24/24</strong>
              </li>
            </ul>
            <p className="checked-note">
              {lastChecked ? `Last check ${lastChecked}` : 'No check run this session'}
            </p>
          </div>
        </section>

        <section className="metrics-grid" aria-label="Key metrics">
          {metrics.map((metric) => (
            <article className="metric-card panel" key={metric.label}>
              <p>{metric.label}</p>
              <div className="metric-row">
                <strong>{metric.value}</strong>
                <span>{metric.trend}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="content-grid" id="controls">
          <article className="panel">
            <div className="section-heading">
              <h2>Trust stack</h2>
              <span className="pill">Verified</span>
            </div>

            <ul className="pillar-list">
              {pillars.map((pillar) => (
                <li key={pillar.name}>
                  <div className="pillar-head">
                    <strong>{pillar.name}</strong>
                    <span>{pillar.progress}%</span>
                  </div>
                  <p>{pillar.detail}</p>
                  <div className="bar-track" aria-hidden="true">
                    <span style={{ width: `${pillar.progress}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <div className="section-heading">
              <h2>Recent activity</h2>
              <span className="pill neutral">Live</span>
            </div>

            <ul className="activity-list">
              {activity.map((item) => (
                <li key={`${item.time}-${item.title}`} className={item.fresh ? 'fresh' : undefined}>
                  <time>{item.time}</time>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="panel table-panel" id="coverage">
          <div className="section-heading">
            <h2>Security coverage matrix</h2>
            <button type="button" className="link-button" onClick={() => setPolicyOpen(true)}>
              Open policy map →
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Control description</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map(([name, detail]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel runbook-panel" id="runbook">
          <div className="section-heading">
            <h2>Deployment runbook</h2>
            <span className="pill neutral">Operational</span>
          </div>

          <ol className="runbook-list">
            {runbook.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="footer">
        <span>{APP_NAME} · Secure operations console</span>
        <span>Built for consent-based monitoring and recovery</span>
      </footer>

      {policyOpen ? (
        <div className="modal-backdrop" onMouseDown={() => setPolicyOpen(false)}>
          <div
            className="modal panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">Policy reference</p>
                <h2 id="policy-title">{APP_NAME} policy map</h2>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setPolicyOpen(false)}
                aria-label="Close policy map"
              >
                ×
              </button>
            </div>
            <p className="modal-intro">
              Each control below is enforced before a device is trusted, and re-checked on every
              health cycle.
            </p>
            <ol className="policy-map">
              {matrix.map(([capability, control], index) => (
                <li key={capability}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{capability}</strong>
                    <p>{control}</p>
                  </div>
                </li>
              ))}
            </ol>
            <button type="button" className="primary-button modal-action" onClick={() => setPolicyOpen(false)}>
              Done
            </button>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className={`toast ${toast.tone}`} role="status" key={toast.id}>
          <span className="toast-dot" aria-hidden="true" />
          {toast.message}
        </div>
      ) : null}
    </div>
  )
}

export default App
