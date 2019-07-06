import { GetProducts_products } from "./graphql-types";

export interface ICartItem extends GetProducts_products {
  quantity: number;
  size: string;
  color: string;
}
