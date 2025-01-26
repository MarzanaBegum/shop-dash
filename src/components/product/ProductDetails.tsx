"use client";

import { useCallback, useEffect, useState } from "react";
import { CartProductType, SelectedImgType } from "../../../utils/constant";
import SetColor from "./SetColor";
import SetQuantity from "./SetQuantity";
import Button from "../Button";
import ProductImage from "./ProductImage";
import { useCart } from "../../../hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material";
import { Product, Review } from "@prisma/client";

interface ProductDetailProps {
  product: Product & {
    reviews: Review[];
  };
}

const Horizontal = () => {
  return <hr className="w-[40%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailProps> = ({
  product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    inStock: false,
    images: [],
    reviews: [],
  },
}) => {
  const rounter = useRouter();
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const productRating =
    product.reviews.reduce(
      (acc: number, item: Review) => item.rating + acc,
      0
    ) / product.reviews.length;

  const handleSetColor = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const handleQtyIncreate = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecreate = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleSetColor}
        />
      </div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl text-slate-700 font-medium">{product.name}</h2>
        <div className="flex gap-2 items-center">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-600"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  rounter.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleSetColor={handleSetColor}
              />
            </div>
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecreate={handleQtyDecreate}
              handleQtyIncreate={handleQtyIncreate}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                onClick={() => handleAddProductToCart(cartProduct)}
                label="Add To Cart"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
