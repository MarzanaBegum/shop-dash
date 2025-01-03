"use client";

import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../../../hooks/useCart";

const CartCount = () => {
  const router = useRouter();
  const { cartTotalQty } = useCart();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute top-[-10px] right-[-10px] text-sm text-white h-6 w-6 bg-slate-700 rounded-full flex items-center justify-center">
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
