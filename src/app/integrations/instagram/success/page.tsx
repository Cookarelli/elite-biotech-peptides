import { cookies } from "next/headers";
import { SiteShell } from "@/components/SiteShell";

interface InstagramOauthResult {
  accessToken: string;
  igUserId: string;
  username?: string;
  expiresIn?: number;
  scopes?: string;
  capturedAt?: string;
}

function maskToken(token: string) {
  if (token.length <= 12) return token;
  return `${token.slice(0, 6)}...${token.slice(-6)}`;
}

export default async function InstagramSuccessPage() {
  const cookieStore = await cookies();
  const rawResult = cookieStore.get("instagram_oauth_result")?.value;

  let result: InstagramOauthResult | null = null;
  try {
    result = rawResult ? (JSON.parse(rawResult) as InstagramOauthResult) : null;
  } catch {
    result = null;
  }

  return (
    <SiteShell>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-neutral-800 bg-neutral-900/40 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
            Instagram Connected
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Instagram token captured
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300">
            Copy these values into your root <code>.env.local</code> so the worker can publish
            and sync analytics.
          </p>
        </section>

        {!result ? (
          <section className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-100">
            No Instagram OAuth result was found. Run the connection flow again from
            <span className="font-medium"> /integrations/instagram</span>.
          </section>
        ) : (
          <>
            <section className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">Environment values</h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                    INSTAGRAM_ACCESS_TOKEN
                  </p>
                  <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all text-sm text-neutral-200">
                    {result.accessToken}
                  </pre>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                    INSTAGRAM_IG_USER_ID
                  </p>
                  <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all text-sm text-neutral-200">
                    {result.igUserId}
                  </pre>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">Connection details</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-neutral-300">
                <p>
                  <span className="font-semibold text-white">Username:</span>{" "}
                  {result.username ?? "Not returned"}
                </p>
                <p>
                  <span className="font-semibold text-white">Token preview:</span>{" "}
                  {maskToken(result.accessToken)}
                </p>
                <p>
                  <span className="font-semibold text-white">Expires in:</span>{" "}
                  {typeof result.expiresIn === "number"
                    ? `${result.expiresIn} seconds`
                    : "Not returned"}
                </p>
                <p>
                  <span className="font-semibold text-white">Captured at:</span>{" "}
                  {result.capturedAt ?? "Unknown"}
                </p>
                <p>
                  <span className="font-semibold text-white">Scopes:</span>{" "}
                  {result.scopes ?? "Not returned"}
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">Next step</h2>
              <pre className="mt-4 overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4 text-sm text-neutral-200">
{`INSTAGRAM_ENABLED=true
INSTAGRAM_ACCESS_TOKEN=${result.accessToken}
INSTAGRAM_IG_USER_ID=${result.igUserId}`}
              </pre>
            </section>
          </>
        )}
      </div>
    </SiteShell>
  );
}
