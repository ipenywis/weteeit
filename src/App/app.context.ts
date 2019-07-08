import React from "react";
import { ICartItem } from "./typings/cart";

export interface IAppContextProps {
  cart: ICartItem[];
  setCart: (callback: (prevValue: ICartItem[]) => ICartItem[]) => void;
  updateCartItem: (name: string, newItem: ICartItem) => void;
  removeCartItem: (name: string) => void;
}

export const DEFAULT_CONTEXT: IAppContextProps = {
  cart: [],
  setCart: () => {},
  updateCartItem: () => {},
  removeCartItem: () => {}
};

export const AppContext = React.createContext(DEFAULT_CONTEXT);
