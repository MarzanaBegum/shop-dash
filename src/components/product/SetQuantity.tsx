"use client";

import { CartProductType } from "../../../utils/constant";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncreate: () => void;
  handleQtyDecreate: () => void;
}

const btnStyle = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyDecreate,
  handleQtyIncreate,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-base">
        <button className={btnStyle} onClick={handleQtyDecreate}>-</button>
        <div>{cartProduct.quantity}</div>
        <button className={btnStyle} onClick={handleQtyIncreate}>+</button>
      </div>
    </div>
  );
};

export default SetQuantity;
