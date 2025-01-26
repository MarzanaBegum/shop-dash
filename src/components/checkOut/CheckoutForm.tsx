"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../../hooks/useCart";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { formatePrice } from "../../../utils/formate";
import toast from "react-hot-toast";
import Heading from "@/components/Heading";
import Button from "@/components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const formatedPrice = formatePrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) return;
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    stripe
      .confirmPayment({ elements, redirect: "if_required" })
      .then((result) => {
        if (!result.error) {
          toast.success("Payment success");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setLoading(false);
      });
  };

  return (
    <form id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold mb-2">Address Information</h2>
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["US", "KE"] }}
      />
      <h2 className="font-semibold mb-2 mt-4">Payment Information</h2>
      <PaymentElement options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 font-bold text-xl">
        Total: {formatedPrice}
      </div>
      <Button
        label={loading ? "Processing" : "Pay now"}
        disabled={loading || !stripe || !elements}
        onClick={handleSubmit}
      />
    </form>
  );
};

export default CheckoutForm;
