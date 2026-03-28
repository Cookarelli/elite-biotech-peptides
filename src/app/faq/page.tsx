import { SiteShell } from "@/components/SiteShell";

const faqs = [
  {
    q: "What are peptides?",
    a: "Peptides are short amino-acid chains used in a wide range of laboratory signaling and pathway studies.",
  },
  {
    q: "Who is this catalog for?",
    a: "The Elite Biotech Peptides catalog is presented for laboratory researchers and procurement teams evaluating research materials.",
  },
  {
    q: "Are products standardized?",
    a: "Yes. This founder demo is standardized to one flagship concentration per item in a 10 mL vial format.",
  },
  {
    q: "Do you provide COA documentation?",
    a: "The COA library is structured by batch and includes downloadable demo files. Production can use signed PDFs.",
  },
  {
    q: "Can I place an order on this site?",
    a: "Current checkout is intentionally disabled in this demo build. Procurement and inquiry flow can be enabled next.",
  },
  {
    q: "Are any medical claims made on this website?",
    a: "No. Products are listed for laboratory research use only and are not for human consumption.",
  },
];

export default function FAQPage() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h1 className="text-3xl font-semibold">Research FAQ</h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Core answers for cofounders, buyers, and operations partners reviewing the storefront.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
              <h2 className="text-base font-semibold text-neutral-100">{item.q}</h2>
              <p className="mt-2 text-sm text-neutral-300">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
