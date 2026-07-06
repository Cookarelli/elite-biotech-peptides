import './globals.css';

export const metadata = {
  title: 'Elite Growth OS Dashboard',
  description: 'Internal growth operations cockpit for Elite Biotech Peptides.'
};

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'content-ideas', label: 'Content Ideas' },
  { id: 'assets', label: 'Assets' },
  { id: 'publish-queue', label: 'Publish Queue' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'prompt-versions', label: 'Prompt Versions' },
  { id: 'agent-runs', label: 'Agent Runs' }
] as const;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_26%),linear-gradient(180deg,_#020617_0%,_#020617_45%,_#081120_100%)] text-white">
          <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-8 px-4 py-8 sm:px-6 xl:px-10">
            <header className="rounded-[30px] border border-white/10 bg-white/[0.03] px-6 py-6 shadow-[0_16px_60px_rgba(2,6,23,0.35)] backdrop-blur">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.45em] text-cyan-200/70">Elite Growth OS</p>
                  <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Internal growth operations for EliteBiotechPeptides.com
                  </h1>
                  <p className="max-w-3xl text-base leading-7 text-slate-300">
                    Plan content, map every angle to a product page, keep risky work under approval, and watch performance without leaving the dashboard.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <a
                    href="https://www.instagram.com/elitebiotechpeptides/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[20px] border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/@EliteBiotechPeptides"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[20px] border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.tiktok.com/@elitebiotechpeptides"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[20px] border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </header>

            <div className="grid flex-1 gap-6 xl:grid-cols-[260px,1fr]">
              <aside className="h-fit rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_16px_60px_rgba(2,6,23,0.35)] backdrop-blur xl:sticky xl:top-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Navigation</p>
                <nav className="mt-4 space-y-2 text-sm" aria-label="Dashboard sections">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-slate-300 transition hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Go</span>
                    </a>
                  ))}
                </nav>
              </aside>

              <main className="space-y-8">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
