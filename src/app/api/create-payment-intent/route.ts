import Stripe from "stripe";
import { CartProductType } from "../../../../utils/constant";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../../libs/prismadb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  const price = Math.floor(totalPrice);
  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;

  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "USD",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      if (current_intent.status === "succeeded") {
        return NextResponse.json(
          { error: "PaymentIntent already succeeded. Cannot update." },
          { status: 400 }
        );
      }
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );

      // Find existing order
      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentId: payment_intent_id },
      });

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid payment intent" },
          { status: 400 }
        );
      }

      // Update order
      const _updated_order = await prisma.order.update({
        where: { id: existing_order.id },
        data: { amount: total, products: items },
      });

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    //create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "USD",
      automatic_payment_methods: { enabled: true },
    });

    //create the order
    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({ data: orderData });

    return NextResponse.json({ paymentIntent });
  }
}
