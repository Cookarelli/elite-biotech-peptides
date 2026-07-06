import { NextResponse } from "next/server";
import {
  getCartSummary,
  normalizeReferralCode,
  type CartItem,
} from "@elite-biotech/shared";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { items?: CartItem[]; referralCode?: string };
    const items = Array.isArray(body.items) ? body.items : [];
    const referralCode = normalizeReferralCode(body.referralCode);
    const summary = getCartSummary(items);

    if (summary.lines.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    const order = await createPayPalOrder({
      items: summary.lines.map((line) => ({
        name: line.product.name,
        quantity: String(line.quantity),
        unit_amount: {
          currency_code: "USD",
          value: line.unitPrice.toFixed(2),
        },
      })),
      subtotal: summary.subtotal.toFixed(2),
      discount: summary.discountAmount.toFixed(2),
      shipping: summary.shipping.toFixed(2),
      total: summary.total.toFixed(2),
      referralCode,
    });

    return NextResponse.json({
      id: order.id,
    });
  } catch (error) {
    console.error("Failed to create PayPal order", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create PayPal order.",
      },
      { status: 500 }
    );
  }
}
