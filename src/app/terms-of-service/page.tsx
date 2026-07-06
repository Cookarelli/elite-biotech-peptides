import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Terms of Service | Elite Biotech Peptides",
  description:
    "Terms of Service for Elite Biotech Peptides governing website usage, orders, communications, and research-use-only product information."
};

const sections = [
  {
    title: "Use of the Website",
    body: [
      "By accessing or using EliteBiotechPeptides.com, you agree to use the website only for lawful purposes and in accordance with these Terms of Service.",
      "You may not use the website in any way that could damage, disable, overburden, interfere with, or compromise the website, its services, or its security."
    ]
  },
  {
    title: "Research Use Only",
    body: [
      "Products offered by Elite Biotech Peptides are intended for laboratory and research purposes only unless explicitly stated otherwise.",
      "No content on this website is intended as medical advice, diagnosis, treatment, or a claim regarding disease prevention or cure."
    ]
  },
  {
    title: "Orders and Requests",
    body: [
      "All orders, invoice requests, documentation requests, and procurement-related communications are subject to review and acceptance by Elite Biotech Peptides.",
      "We reserve the right to refuse, limit, cancel, or delay any order or request at our discretion, including for compliance, verification, inventory, payment, or operational reasons."
    ]
  },
  {
    title: "Pricing and Availability",
    body: [
      "Product listings, pricing, availability, and website content may be updated, corrected, or removed at any time without prior notice.",
      "We are not responsible for typographical errors, temporary inaccuracies, or outdated information displayed on the site."
    ]
  },
  {
    title: "Intellectual Property",
    body: [
      "All website content, branding, logos, text, design elements, graphics, and related materials are owned by or licensed to Elite Biotech Peptides and may not be copied, reproduced, or used without permission.",
      "Unauthorized use of website content may violate intellectual property and other applicable laws."
    ]
  },
  {
    title: "Third-Party Services and Platforms",
    body: [
      "The website may rely on or link to third-party providers, payment processors, hosting services, analytics tools, and social media platforms.",
      "Elite Biotech Peptides is not responsible for the content, availability, or policies of third-party sites or services."
    ]
  },
  {
    title: "Disclaimers and Limitation of Liability",
    body: [
      "The website and its content are provided on an 'as is' and 'as available' basis without warranties of any kind, whether express or implied, to the fullest extent permitted by law.",
      "Elite Biotech Peptides is not liable for indirect, incidental, consequential, special, or punitive damages arising from or related to your use of the website, products, communications, or services."
    ]
  },
  {
    title: "Changes to These Terms",
    body: [
      "We may update these Terms of Service from time to time. Continued use of the website after changes become effective constitutes acceptance of the updated terms."
    ]
  },
  {
    title: "Contact",
    body: [
      "If you have questions about these Terms of Service, contact support@elitebiotechpeptides.com or procurement@elitebiotechpeptides.com."
    ]
  }
];

export default function TermsOfServicePage() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-neutral-800 bg-neutral-900/40 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
            Terms of Service
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Terms of Service for Elite Biotech Peptides
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300">
            Effective date: April 4, 2026. These Terms of Service govern access to and use of
            EliteBiotechPeptides.com and related communications, requests, and services offered
            by Elite Biotech Peptides.
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
