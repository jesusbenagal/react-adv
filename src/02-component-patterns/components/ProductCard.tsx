import { createContext, ReactElement, CSSProperties } from "react";

import { useProduct } from "../hooks/useProduct";
import {
  InitialValues,
  OnChangeArgs,
  Product,
  ProductContextProps,
} from "../interfaces/interfaces";

import styles from "../styles/styles.module.css";
import { ProductCardHandlers } from "../interfaces/interfaces";

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export interface Props {
  // children?: ReactElement | ReactElement[]
  children: (args: ProductCardHandlers) => JSX.Element;
  product: Product;
  className?: string;
  style?: CSSProperties;
  onChange?: (args: OnChangeArgs) => void;
  value?: number;
  initialValues?: InitialValues;
}

export const ProductCard = ({
  children,
  product,
  className,
  style,
  onChange,
  value,
  initialValues,
}: Props) => {
  const { counter, increaseBy, maxCount, isMaxCountReached, reset } =
    useProduct({
      onChange,
      product,
      value,
      initialValues,
    });

  return (
    <Provider value={{ counter, increaseBy, product, maxCount }}>
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children({
          count: counter,
          isMaxCountReached: isMaxCountReached,
          maxCount: initialValues?.maxCount,
          product,

          increaseBy: increaseBy,
          reset: reset,
        })}
      </div>
    </Provider>
  );
};
