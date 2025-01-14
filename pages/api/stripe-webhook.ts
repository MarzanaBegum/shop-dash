import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "../../libs/prismadb";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buff = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    res.status(400).send("Missing stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buff,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return res.status(500).send("Webhook error" + err);
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;

      if (typeof charge.payment_intent === "string") {
        const existingOrder = await prisma.order.findFirst({
          where: { paymentIntentId: charge.payment_intent },
        });
        if (existingOrder) {
          await prisma.order.update({
            where: { id: existingOrder.id },
            data: {
              status: "complete",
              address: {
                set: {
                  city: charge.shipping?.address?.city,
                  country: charge.shipping?.address?.country,
                  line1: charge.shipping?.address?.line1,
                  line2: charge.shipping?.address?.line2 || null,
                  postal_code: charge.shipping?.address?.postal_code,
                  state: charge.shipping?.address?.state || null,
                },
              },
            },
          });
        }
      }
      break;

    default:
      console.log("unhandled event type: " + event.type);
  }

  res.json({ received: true });
}
