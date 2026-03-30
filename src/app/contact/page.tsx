import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";

const contactImage =
  "https://images.pexels.com/photos/3735706/pexels-photo-3735706.jpeg?cs=srgb&dl=pexels-polina-tankilevitch-3735706.jpg&fm=jpg";

export default function Contact() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
            <h1 className="text-3xl font-semibold">Procurement Contact</h1>
            <p className="mt-3 max-w-2xl text-neutral-300">
              Clear inquiry channels, response expectations, and launch-time support for research buyers.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 min-h-[280px]">
            <Image
              src={contactImage}
              alt="Laboratory prep and support workflow"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="General Inquiries"
            value="support@elitebiotechpeptides.com"
            note="Catalog questions, account setup, and order workflow."
          />
          <Card
            title="Procurement Desk"
            value="procurement@elitebiotechpeptides.com"
            note="Bulk quotes, documentation requests, and checkout support."
          />
          <Card
            title="Response Window"
            value="< 1 business day"
            note="Priority response for active procurement conversations."
          />
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h2 className="text-xl font-semibold">Inquiry Intake Template</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Use this structure for faster procurement routing.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Compound name(s)",
              "Target quantity per item",
              "Required format or strength",
              "Documentation needed upon request",
              "Shipping destination and timeline",
              "Organization name and point of contact",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-3 text-sm text-neutral-300">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-neutral-500">
            Research use only. Not for human consumption. No medical claims.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}

function Card({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{title}</p>
      <p className="mt-2 text-sm font-semibold text-neutral-100">{value}</p>
      <p className="mt-2 text-xs text-neutral-400">{note}</p>
    </div>
  );
}
