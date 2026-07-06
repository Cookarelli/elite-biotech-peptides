import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Elite Biotech Peptides",
  description:
    "Privacy Policy for Elite Biotech Peptides covering website usage, inquiries, checkout, and platform integrations."
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect contact details you submit through forms, checkout information needed to process orders, and technical usage information such as browser type, IP address, and pages visited.",
      "If you contact us for documentation, invoices, support, or procurement questions, we may store the details needed to respond and maintain the request history.",
      "If you choose to join birthday or specials updates, we collect your name, email address, consent status, and optional birthday month and day only."
    ]
  },
  {
    title: "How We Use Information",
    body: [
      "We use submitted information to respond to inquiries, process transactions, fulfill support and documentation requests, improve the website experience, and maintain internal operational records.",
      "We may also use limited analytics and platform data to understand how content and product pages perform, improve site navigation, and review the effectiveness of approved marketing activity."
    ]
  },
  {
    title: "Sharing of Information",
    body: [
      "We do not sell your personal information. We may share information with service providers that help us operate the website, process payments, fulfill communications, or maintain infrastructure.",
      "We may also disclose information when required by law, to enforce our terms, or to protect the rights, safety, and operations of Elite Biotech Peptides."
    ]
  },
  {
    title: "Cookies and Analytics",
    body: [
      "We may use cookies, basic analytics tools, and similar technologies to understand site traffic, improve performance, and support approved internal reporting.",
      "Third-party platforms such as payment processors, hosting providers, and social media integrations may also collect information subject to their own policies."
    ]
  },
  {
    title: "Data Security",
    body: [
      "We use reasonable administrative, technical, and organizational measures to protect information under our control. No system can guarantee absolute security, but we work to reduce unnecessary exposure and limit access to internal systems."
    ]
  },
  {
    title: "Your Choices",
    body: [
      "You may contact us to request updates or deletion of information you have submitted to us, subject to any legal or operational retention requirements.",
      "You may also choose not to submit optional information, although some website features or support workflows may not function without it.",
      "Birthday and specials signup is optional and is not required to purchase. Promotional messages may include opt-out instructions when email marketing is connected."
    ]
  },
  {
    title: "Platform Integrations",
    body: [
      "If you interact with Elite Biotech Peptides through third-party platforms such as Instagram, YouTube, or TikTok, any information shared through those platforms is also governed by the applicable third-party platform policies and permissions you grant there.",
      "Our internal systems may use approved platform data for analytics, publishing workflow review, and inbound engagement support, but risky actions remain subject to human approval."
    ]
  },
  {
    title: "Contact",
    body: [
      "If you have questions about this Privacy Policy or your data, contact Elite Biotech Peptides at support@elitebiotechpeptides.com or procurement@elitebiotechpeptides.com."
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-neutral-800 bg-neutral-900/40 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Privacy Policy for Elite Biotech Peptides
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300">
            Effective date: April 4, 2026. This Privacy Policy explains how Elite Biotech
            Peptides collects, uses, stores, and protects information through
            EliteBiotechPeptides.com and approved business tools connected to the site.
          </p>
        </section>

        <div className="grid gap-4">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8"
            >
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-neutral-300">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
