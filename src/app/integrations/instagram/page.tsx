import { headers } from "next/headers";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { env } from "@/lib/env";
import { getInstagramRedirectUri, getInstagramScopes } from "@/lib/instagram-oauth";

interface InstagramIntegrationPageProps {
  searchParams?: Promise<{
    error?: string;
  }>;
}

export default async function InstagramIntegrationPage({
  searchParams,
}: InstagramIntegrationPageProps) {
  const params = (await searchParams) ?? {};
  const headerStore = await headers();
  const forwardedProto = headerStore.get("x-forwarded-proto") ?? "https";
  const forwardedHost = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const runtimeBaseUrl = forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : env.NEXT_PUBLIC_SITE_URL;
  const scopes = getInstagramScopes();
  const isConfigured = Boolean(env.INSTAGRAM_APP_ID && env.INSTAGRAM_APP_SECRET);
  const redirectUri = getInstagramRedirectUri(runtimeBaseUrl);

  return (
    <SiteShell>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-neutral-800 bg-neutral-900/40 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
            Instagram Integration
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Connect Instagram to Elite Growth OS
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300">
            This flow generates the Instagram access token and Instagram user ID needed by the
            publishing worker and analytics sync.
          </p>
        </section>

        {params.error ? (
          <section className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-100">
            {params.error}
          </section>
        ) : null}

        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">Current setup</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-neutral-300">
            <p>
              <span className="font-semibold text-white">App ID:</span>{" "}
              {env.INSTAGRAM_APP_ID ? "Configured" : "Missing"}
            </p>
            <p>
              <span className="font-semibold text-white">App Secret:</span>{" "}
              {env.INSTAGRAM_APP_SECRET ? "Configured" : "Missing"}
            </p>
            <p>
              <span className="font-semibold text-white">Redirect URI:</span>{" "}
              <span className="break-all">{redirectUri}</span>
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">Requested scopes</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-300">
            {scopes.map((scope) => (
              <li key={scope} className="rounded-2xl border border-neutral-800 bg-neutral-950/60 px-4 py-3">
                {scope}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">Start connection</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-300">
            <p>
              In Meta, make sure this exact redirect URI is allowed:
              <br />
              <span className="break-all font-medium text-white">{redirectUri}</span>
            </p>
            <p>
              Keep the Meta app in Development mode until this flow succeeds. After that, we can
              switch to Live mode.
            </p>
            {isConfigured ? (
              <Link
                href="/api/integrations/instagram/connect"
                className="inline-flex rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
              >
                Connect Instagram
              </Link>
            ) : (
              <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-100">
                Add <code>INSTAGRAM_APP_ID</code> and <code>INSTAGRAM_APP_SECRET</code> to your
                environment before starting this flow.
              </p>
            )}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
