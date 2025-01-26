"use client";

import { CartProductType } from "@prisma/client";
import Image from "next/image";
import truncateText from "../../../utils/truncate";
import { formatePrice } from "../../../utils/formate";

interface OrderItemProps {
  item: CartProductType;
}
const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 gap-4 py-4 px-2 items-center text-xs md:text-sm border-[1.5px] border-slate-200">
      <div className="justify-self-start col-span-2 flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            className="object-contain"
            fill
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatePrice(item.price)}</div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="font-semibold justify-self-end">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
