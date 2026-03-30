"use client";

import { useMemo, useState } from "react";
import { getProductFormat, type Product } from "@elite-biotech/shared";

export function DocumentationRequestForm({ product }: { product?: Product }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const mailto = useMemo(() => {
    const subject = product
      ? `Documentation Request - ${product.name}`
      : "Documentation Request";
    const body = [
      "Elite Biotech documentation request",
      "",
      `Product: ${product?.name ?? "General inquiry"}`,
      `Format: ${product ? getProductFormat(product) : "General catalog question"}`,
      "",
      `Name: ${fullName || "N/A"}`,
      `Email: ${email || "N/A"}`,
      "",
      "Requested details:",
      notes || "Please share available documentation for review.",
    ].join("\n");

    return `mailto:support@elitebiotechpeptides.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [email, fullName, notes, product]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-neutral-300">
          <span className="font-medium text-neutral-200">Full name</span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-sky-400"
          />
        </label>
        <label className="space-y-2 text-sm text-neutral-300">
          <span className="font-medium text-neutral-200">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-sky-400"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-neutral-300">
        <span className="font-medium text-neutral-200">What do you need?</span>
        <textarea
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Example: Please send available COA or product documentation for this item."
          className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-sky-400"
        />
      </label>

      <a
        href={mailto}
        className="inline-flex items-center rounded-xl border border-neutral-700 px-4 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
      >
        Open documentation request email
      </a>
    </div>
  );
}
