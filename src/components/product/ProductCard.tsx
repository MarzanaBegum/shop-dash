"use client";

import Image from "next/image";
import truncateText from "../../../utils/truncate";
import { formatePrice } from "../../../utils/formate";
import { useRouter } from "next/navigation";
import { productType, ReviewsType } from "../../../utils/constant";
import { Rating } from "@mui/material";

interface ProductCardProps {
  data: productType;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const productRating =
    data.reviews.reduce(
      (acc: number, item: ReviewsType) => item.rating + acc,
      0
    ) / data.reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="cursor-pointer col-span-1 border-[1.2px] border-slate-[200px] bg-slate-50 rounded-sm p-2 transition text-center text-sm hover:scale-105"
    >
      <div className="flex flex-col items-center gap-1 w-full">
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={data.images[0].image}
            alt={data.name}
            fill
            sizes="100%"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatePrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
