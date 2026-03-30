import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { orderId?: string };

    if (!body.orderId) {
      return NextResponse.json(
        { error: "Missing order ID." },
        { status: 400 }
      );
    }

    const order = await capturePayPalOrder(body.orderId);
    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error("Failed to capture PayPal order", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to capture PayPal order.",
      },
      { status: 500 }
    );
  }
}
