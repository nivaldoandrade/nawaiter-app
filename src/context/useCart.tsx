import { createContext, ReactNode, useContext, useState } from 'react';
import { ICartItem } from '../types/Cart';
import { Product } from '../types/Product';
import { formatPrice } from '../utils/formaPrice';

interface ICartProviderProps {
  children: ReactNode;
}

interface ICartContext {
  cart: ICartItem[];
  addCart: (product: Product) => void;
  updatedQuantityProduct: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subTotalProduct: ISubTotalProduct;
  total: string;
}

interface ISubTotalProduct {
  [key: string]: string;
}

export const CartContext = createContext({} as ICartContext);

export function CartProvider({ children }: ICartProviderProps) {
  const [cart, setCart] = useState<ICartItem[]>([]);

  function addCart(product: Product) {
    const cartItemIndex = cart.findIndex(
      (item) => item.product._id === product._id
    );

    const newCart = [...cart];

    if (cartItemIndex < 0) {
      setCart((state) => state.concat({ product, quantity: 1 }));
    } else {
      newCart[cartItemIndex].quantity++;

      setCart(newCart);
    }
  }

  function updatedQuantityProduct(productId: string, quantity: number) {
    if (quantity <= 0) {
      setCart((state) =>
        state.filter((item) => item.product._id !== productId)
      );

      return;
    }

    const cartItemIndex = cart.findIndex(
      (item) => item.product._id === productId
    );

    const newCart = [...cart];

    newCart[cartItemIndex].quantity = quantity;

    setCart(newCart);
  }

  function clearCart() {
    setCart([]);
  }

  const subTotalProduct = cart.reduce((subTotal, item) => {
    return {
      ...subTotal,
      [item.product._id]: formatPrice(item.product.price * item.quantity)
    };
  }, {} as ISubTotalProduct);

  const total = formatPrice(
    cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0)
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        updatedQuantityProduct,
        clearCart,
        subTotalProduct,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
