import React from "react";
import { ICartItem } from "./typings/cart";

export interface IAppContextProps {
  cart: ICartItem[];
  instructions: string | null;
  setCart: (callback: (prevValue: ICartItem[]) => ICartItem[]) => void;
  updateCartItem: (name: string, newItem: ICartItem) => void;
  removeCartItem: (name: string) => void;
  setCanOrder: (canOrder: boolean) => void;
  setInstructions: (instructions: string) => void;

  /**
   * Determins if user can access order page, must be set to true from /cart page
   */
  canOrder: boolean;
}

export const DEFAULT_CONTEXT: IAppContextProps = {
  cart: [],
  instructions: null,
  setCart: () => {},
  updateCartItem: () => {},
  removeCartItem: () => {},
  setCanOrder: () => {},
  setInstructions: () => {},
  canOrder: false
};

export const AppContext = React.createContext(DEFAULT_CONTEXT);
