"use client";

import Image from "next/image";
import {
  CartProductType,
  productType,
  SelectedImgType,
} from "../../../utils/constant";

interface ProductImgProps {
  cartProduct: CartProductType;
  product: productType;
  handleColorSelect: (value: SelectedImgType) => void;
}
const ProductImage: React.FC<ProductImgProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col gap-4 items-center justify-center cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`w-[80%] relative aspect-square rounded border-teal-300 ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
            >
              <Image
                alt={image.color}
                src={image.image}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 relative aspect-square">
        <Image
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          fill
          className="w-full h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImage;
