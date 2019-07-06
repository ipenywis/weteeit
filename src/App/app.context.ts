import React from "react";
import { ICartItem } from "./typings/cart";

export interface IAppContextProps {
  cart: ICartItem[];
  setCart: (callback: (prevValue: ICartItem[]) => ICartItem[]) => void;
}

export const DEFAULT_CONTEXT: IAppContextProps = {
  cart: [],
  setCart: () => {}
};

export const AppContext = React.createContext(DEFAULT_CONTEXT);
