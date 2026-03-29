import { getProductFormat, type Product } from "./catalog";

export const PROCUREMENT_EMAIL = "procurement@elitebiotechpeptides.com";

export type InvoiceRequestInput = {
  product?: Product;
  fullName: string;
  email: string;
  company?: string;
  quantity: string;
  shipping?: string;
  notes?: string;
};

export type InvoiceRequestPayload = {
  source?: "web" | "mobile";
  productSlug?: string;
  quantity?: number;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  shippingLocation?: string;
  notes?: string;
};

export { getProductFormat };

export function buildInvoiceDraft(input: InvoiceRequestInput) {
  const productName = input.product?.name ?? "General catalog inquiry";
  const productPrice = input.product?.price ?? "Custom quote";
  const productFormat = getProductFormat(input.product);
  const subject = `Invoice Request - ${productName}`;
  const body = [
    "Elite Biotech Peptides invoice request",
    "",
    `Product: ${productName}`,
    `Format: ${productFormat}`,
    `Price shown: ${productPrice}`,
    `Quantity: ${input.quantity}`,
    "",
    `Name: ${input.fullName}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "N/A"}`,
    `Shipping / location: ${input.shipping || "N/A"}`,
    "",
    "Notes:",
    input.notes || "N/A",
  ].join("\n");

  const mailtoUrl = `mailto:${PROCUREMENT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailtoUrl };
}

export function buildInvoiceRequestPayload(
  input: InvoiceRequestInput,
  source: "web" | "mobile"
): InvoiceRequestPayload {
  return {
    source,
    productSlug: input.product?.slug,
    quantity: Math.max(1, Number.parseInt(input.quantity, 10) || 1),
    customerName: input.fullName.trim(),
    customerEmail: input.email.trim(),
    customerCompany: input.company?.trim() || undefined,
    shippingLocation: input.shipping?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
  };
}
