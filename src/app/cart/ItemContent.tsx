"use client";

import Link from "next/link";
import { CartProductType } from "../../../utils/constant";
import { formatePrice } from "../../../utils/formate";
import truncateText from "../../../utils/truncate";
import Image from "next/image";
import SetQuantity from "@/components/product/SetQuantity";
import { useCart } from "../../../hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtnIncrease,
    handleCartQtnDecrease,
  } = useCart();
  return (
    <div className="grid grid-cols-5 gap-4 items-center text-xs md:text-sm py-4 border-t-[1.5px] border-slate-200">
      <div className="col-span-2 flex justify-self-start gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatePrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyDecreate={() => {
            handleCartQtnDecrease(item);
          }}
          handleQtyIncreate={() => handleCartQtnIncrease(item)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatePrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
