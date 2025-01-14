import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartProductType } from "../utils/constant";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtnIncrease: (product: CartProductType) => void;
  handleCartQtnDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propsName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotal();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedProduct;

      if (prev) {
        updatedProduct = [...prev, product];
      } else {
        updatedProduct = [product];
      }
      toast.success("Product added to cart");
      localStorage.setItem("eShopItems", JSON.stringify(updatedProduct));
      return updatedProduct;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filterProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filterProducts);
        toast.success("Product remove");
        localStorage.setItem("eShopItems", JSON.stringify(filterProducts));
      }
    },
    [cartProducts]
  );

  const handleCartQtnIncrease = useCallback(
    (product: CartProductType) => {
      let updatedProduct;

      if (product.quantity === 99) {
        toast.error("Ooops! Maximum reached");
      }
      if (cartProducts) {
        updatedProduct = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedProduct[existingIndex].quantity = ++updatedProduct[
            existingIndex
          ].quantity;
        }
        setCartProducts(updatedProduct);
        localStorage.setItem("eShopItems", JSON.stringify(updatedProduct));
      }
    },
    [cartProducts]
  );

  const handleCartQtnDecrease = useCallback(
    (product: CartProductType) => {
      let updatedProduct;

      if (product.quantity === 1) {
        toast.error("Ooops! Minimum reached");
      }
      if (cartProducts) {
        updatedProduct = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedProduct[existingIndex].quantity = --updatedProduct[
            existingIndex
          ].quantity;
        }
        setCartProducts(updatedProduct);
        localStorage.setItem("eShopItems", JSON.stringify(updatedProduct));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.removeItem("eShopItems");
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtnIncrease,
    handleCartQtnDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null)
    throw new Error("useCart must be used within a CartContextprovider");

  return context;
};
