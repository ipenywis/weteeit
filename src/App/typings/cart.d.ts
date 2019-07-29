import { IProduct } from "./product";

export interface ICartItem extends IProduct {
  quantity: number;
  size: string;
  color: string;
}
