"use client";

import { CartProductType, SelectedImgType } from "../../../utils/constant";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleSetColor: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleSetColor,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex items-center gap-1">
          {images.map((image) => (
            <div
              key={`image-${image.color}`}
              onClick={() => handleSetColor(image)}
              className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
            >
              <div
                style={{ background: image.colorCode }}
                className="h-5 w-5 rounded-full border-[1.2px] border-teal-300 cursor-pointer"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
