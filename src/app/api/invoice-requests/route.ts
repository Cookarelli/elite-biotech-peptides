import { NextResponse } from "next/server";
import { getProductBySlug, type InvoiceRequestPayload } from "@elite-biotech/shared";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const requests = await db.invoiceRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        status: true,
        source: true,
        productName: true,
        customerName: true,
        customerEmail: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, requests });
  } catch (error) {
    console.error("Failed to list invoice requests", error);
    return NextResponse.json(
      { error: "Unable to load invoice requests." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InvoiceRequestPayload;
    const product = getProductBySlug(payload.productSlug);

    if (!payload.customerName?.trim() || !payload.customerEmail?.trim()) {
      return NextResponse.json(
        { error: "Customer name and email are required." },
        { status: 400 }
      );
    }

    const record = await db.invoiceRequest.create({
      data: {
        source: payload.source ?? "web",
        productSlug: product?.slug,
        productName: product?.name ?? "General catalog inquiry",
        productCategory: product?.category,
        priceShown: product?.price,
        strengthMg: product?.strengthMg,
        volumeMl: product?.volumeMl,
        quantity:
          typeof payload.quantity === "number" && payload.quantity > 0 ? payload.quantity : 1,
        customerName: payload.customerName.trim(),
        customerEmail: payload.customerEmail.trim(),
        customerCompany: payload.customerCompany?.trim() || null,
        shippingLocation: payload.shippingLocation?.trim() || null,
        notes: payload.notes?.trim() || null,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, invoiceRequest: record }, { status: 201 });
  } catch (error) {
    console.error("Failed to create invoice request", error);
    return NextResponse.json(
      { error: "Unable to create invoice request. Check DATABASE_URL and Prisma setup." },
      { status: 500 }
    );
  }
}
