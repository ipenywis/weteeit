import { GetProducts_productsWithPagination_pagination } from "./graphql-types";

export interface IPagination extends GetProducts_productsWithPagination_pagination {
  count: number | null;
};
