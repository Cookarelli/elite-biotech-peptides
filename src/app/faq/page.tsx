import { SiteShell } from "@/components/SiteShell";

const faqs = [
  {
    q: "What are peptides?",
    a: "Peptides are short amino-acid chains used in a wide range of laboratory signaling and pathway studies.",
  },
  {
    q: "Who is this catalog for?",
    a: "The Elite Biotech Peptides catalog is for laboratory researchers reviewing research-use-only materials.",
  },
  {
    q: "Are products standardized?",
    a: "Most products are listed with one primary format so they are easy to browse and compare.",
  },
  {
    q: "Is documentation available?",
    a: "Yes. COA information can be requested from product pages or the documentation page.",
  },
  {
    q: "How do I place an order?",
    a: "Add products to cart, choose quantities, and complete payment through Venmo. If you need COA information first, request it separately from the product page or documentation page.",
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
            Quick answers about products, ordering, documentation, and research-use-only terms.
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
