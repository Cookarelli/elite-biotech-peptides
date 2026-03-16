import { SiteShell } from "@/components/SiteShell";
import { coaRecords } from "@/data/coa";

export default function COA() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h1 className="text-3xl font-semibold">COA Library</h1>
          <p className="mt-3 text-neutral-300">
            Demo certificate index with fake batch data and downloadable placeholder files.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Batches listed" value={`${coaRecords.length}`} />
            <Metric
              label="Released"
              value={`${coaRecords.filter((r) => r.status === "Released").length}`}
            />
            <Metric label="Testing partners" value="3 Labs" />
            <Metric label="Avg purity" value="99.1%" />
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40">
          <div className="border-b border-neutral-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-neutral-100">Batch Certificates</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Download links are demo files. Production can swap to signed PDFs per batch.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-neutral-950/70 text-xs uppercase tracking-wide text-neutral-400">
                <tr>
                  <th className="px-6 py-3 font-semibold">Compound</th>
                  <th className="px-6 py-3 font-semibold">Batch ID</th>
                  <th className="px-6 py-3 font-semibold">Tested</th>
                  <th className="px-6 py-3 font-semibold">Purity</th>
                  <th className="px-6 py-3 font-semibold">Assay</th>
                  <th className="px-6 py-3 font-semibold">Lab</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">File</th>
                </tr>
              </thead>
              <tbody>
                {coaRecords.map((r) => (
                  <tr key={r.id} className="border-t border-neutral-800 text-neutral-300">
                    <td className="px-6 py-4 font-medium text-neutral-100">{r.compound}</td>
                    <td className="px-6 py-4 font-mono text-xs text-neutral-300">{r.batchId}</td>
                    <td className="px-6 py-4">{r.testedOn}</td>
                    <td className="px-6 py-4">{r.purity}</td>
                    <td className="px-6 py-4">{r.assay}</td>
                    <td className="px-6 py-4">{r.lab}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                          r.status === "Released"
                            ? "border-emerald-600/60 bg-emerald-500/10 text-emerald-300"
                            : "border-amber-600/60 bg-amber-500/10 text-amber-200"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={r.file}
                        download
                        className="inline-flex rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-neutral-100">{value}</p>
    </div>
  );
}
