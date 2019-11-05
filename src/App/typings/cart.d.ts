import { IProduct } from "./product";

export interface ICartItem extends IProduct {
  /**
   * Random key to uniquely identify each cart item
   */
  keyCode: string;
  quantity: number;
  size: string;
  color: string;
}
