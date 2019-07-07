import React from "react";
import { ICartItem } from "./typings/cart";

export interface IAppContextProps {
  cart: ICartItem[];
  setCart: (callback: (prevValue: ICartItem[]) => ICartItem[]) => void;
  updateCartItem: (name: string, newItem: ICartItem) => void;
}

export const DEFAULT_CONTEXT: IAppContextProps = {
  cart: [],
  setCart: () => {},
  updateCartItem: () => {}
};

export const AppContext = React.createContext(DEFAULT_CONTEXT);
