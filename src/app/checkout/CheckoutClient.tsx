"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "../../../hooks/useCart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "@/components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_SECRET_KEY as string
);

const CheckoutClient = () => {
  const isInitialized = useRef(false);
  const router = useRouter();
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!cartProducts || isInitialized.current) return;
    isInitialized.current = true;

    setLoading(true);
    setError(false);

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartProducts,
        payment_intent_id: paymentIntent,
      }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 401) {
          return router.push("/login");
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        handleSetPaymentIntent(data.paymentIntent.id);
      })
      .catch((err) => {
        setError(true);
        toast.error(err);
      });
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading Checkout</div>}
      {error && (
        <div className="text-center text-rose-500">
          Something went wrong....
        </div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View Your Orders"
              onClick={() => router.push("/order")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
