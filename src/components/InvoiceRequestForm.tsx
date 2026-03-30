"use client";

import { useState } from "react";
import {
  buildInvoiceDraft,
  buildInvoiceRequestPayload,
  PROCUREMENT_EMAIL,
  type Product,
} from "@elite-biotech/shared";

export function InvoiceRequestForm({ product }: { product?: Product }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [shipping, setShipping] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    const payload = buildInvoiceRequestPayload(
      {
        product,
        fullName,
        email,
        company,
        quantity,
        shipping,
        notes,
      },
      "web"
    );

    const draft = buildInvoiceDraft({
      product,
      fullName,
      email,
      company,
      quantity,
      shipping,
      notes,
    });

    try {
      const response = await fetch("/api/invoice-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          invoiceRequest?: { id: string };
        };
        setStatusMessage(
          data.invoiceRequest?.id
            ? `Request saved as ${data.invoiceRequest.id}. Opening your email draft now.`
            : "Request saved. Opening your email draft now."
        );
      } else {
        setStatusMessage("Request email will open, but the server copy could not be saved yet.");
      }
    } catch {
      setStatusMessage("Request email will open, but the server copy could not be saved yet.");
    } finally {
      setSubmitting(false);
      window.location.href = draft.mailtoUrl;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          value={fullName}
          onChange={setFullName}
          required
          placeholder="Your name"
        />
        <Field
          label="Email"
          value={email}
          onChange={setEmail}
          required
          type="email"
          placeholder="you@example.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Company"
          value={company}
          onChange={setCompany}
          placeholder="Lab, clinic, or business"
        />
        <Field
          label="Quantity"
          value={quantity}
          onChange={setQuantity}
          required
          placeholder="1"
        />
      </div>

      <Field
        label="Shipping destination"
        value={shipping}
        onChange={setShipping}
        placeholder="City, state, or shipping notes"
      />

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-neutral-200">Product notes</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={5}
          placeholder="Product preferences, shipping details, timeline, or anything else we should know."
          className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-sky-400"
        />
      </label>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
          Invoice flow
        </p>
        <p className="mt-2 text-sm text-neutral-300">
          Submit this request and we can send a manual PayPal invoice off-site after review. This
          keeps checkout off the storefront for launch while still giving buyers a clean payment
          path.
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-2xl bg-sky-400 px-4 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
      >
        {submitting ? "Saving Request..." : "Save Request and Open Email Draft"}
      </button>

      {statusMessage ? (
        <p className="text-sm text-sky-200">{statusMessage}</p>
      ) : null}

      <p className="text-xs text-neutral-500">
        If your email app does not open automatically, send the request manually to
        {" "}
        <span className="font-semibold text-neutral-300">{PROCUREMENT_EMAIL}</span>.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-neutral-200">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-sky-400"
      />
    </label>
  );
}
