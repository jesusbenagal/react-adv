import { useState } from "react";
import { ProductInCart, Product, OnChangeArgs } from "../interfaces/interfaces";

interface useShoppingCartArgs {
  count: number;
  product: Product;
}

export const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState<{
    [key: string]: ProductInCart;
  }>({});

  const onProductCountChange = ({
    count,
    product,
  }: {
    count: number;
    product: Product;
  }) => {
    setShoppingCart((oldShoppingCart) => {
      const productInCart: ProductInCart = oldShoppingCart[product.id] || {
        ...product,
        count: 0,
      };

      if (Math.max(productInCart.count + count, 0) > 0) {
        productInCart.count += count;
        return {
          ...oldShoppingCart,
          [product.id]: productInCart,
        };
      }

      //Borrar el producto del carrito
      const { [product.id]: toDelete, ...rest } = oldShoppingCart;
      return rest;
    });
  };

  return {
    shoppingCart,
    onProductCountChange,
  };
};
