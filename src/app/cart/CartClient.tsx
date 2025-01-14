"use client";

import React from "react";
import { useCart } from "../../../hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import ItemContent from "./ItemContent";
import { formatePrice } from "../../../utils/formate";
import { SafeUser } from "../../../type";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}
const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  if (!cartProducts || cartProducts?.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="flex flex-row items-center gap-1 mt-2 text-slate-500"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 gap-4 pb-2 text-sm items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="flex justify-between py-4 border-t-[1.5px] border-slate-200">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            small
            outline
            onClick={() => {
              handleClearCart();
            }}
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between text-base font-semibold w-full">
            <span>Subtotal</span>
            <span>{formatePrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Texes and shipping calculate at checkout
          </p>
          <Button
            label={currentUser ? "Checkout" : "Login to checkout"}
            outline={currentUser ? false : true}
            onClick={() => {
              return currentUser
                ? router.push("/checkout")
                : router.push("/login");
            }}
          />
          <Link
            href={"/"}
            className="flex flex-row items-center gap-1 mt-2 text-slate-500"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
