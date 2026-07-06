import { NextResponse } from "next/server";
import { normalizeReferralCode, type CartItem } from "@elite-biotech/shared";
import { capturePayPalOrder } from "@/lib/paypal";
import { sendOrderNotifications } from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      orderId?: string;
      items?: CartItem[];
      referralCode?: string;
    };
    const referralCode = normalizeReferralCode(body.referralCode);

    if (!body.orderId) {
      return NextResponse.json(
        { error: "Missing order ID." },
        { status: 400 }
      );
    }

    const order = await capturePayPalOrder(body.orderId);
    const notifications = Array.isArray(body.items) && body.items.length > 0
      ? await sendOrderNotifications({
          orderId: body.orderId,
          items: body.items,
          referralCode,
          paypalOrder: order,
        })
      : null;

    return NextResponse.json({ ok: true, order, notifications });
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
