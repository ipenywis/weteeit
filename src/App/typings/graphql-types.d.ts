/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StoreOrder
// ====================================================

export interface StoreOrder_order_products_orderProduct {
  __typename: "OrderProduct";
  product: number;
  order: number;
  quantity: number;
}

export interface StoreOrder_order_products {
  __typename: "Product";
  name: string;
  type: string;
  price: number;
  imageUrl: string;
  orderProduct: StoreOrder_order_products_orderProduct[] | null;
}

export interface StoreOrder_order {
  __typename: "Order";
  id: number;
  transactionId: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  facebook_profile: string | null;
  wilaya: string;
  city: string;
  products: StoreOrder_order_products[];
}

export interface StoreOrder {
  order: StoreOrder_order | null;
}

export interface StoreOrderVariables {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  facebook_profile: string;
  wilaya: string;
  city: string;
  products: OrderProductInput[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShipping
// ====================================================

export interface GetShipping_shippings {
  __typename: "shipping";
  id: number;
  wilaya: string;
  price: number;
}

export interface GetShipping {
  shippings: GetShipping_shippings[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_product {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  type: string;
  imageUrl: string;
}

export interface GetProduct {
  product: GetProduct_product;
}

export interface GetProductVariables {
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_productsWithPagination_products {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  type: string;
  imageUrl: string;
}

export interface GetProducts_productsWithPagination_pagination {
  __typename: "paginationMetaDataClass";
  pageId: number | null;
  perPage: number | null;
  numPages: number | null;
  count: number | null;
}

export interface GetProducts_productsWithPagination {
  __typename: "productWithPagination";
  products: GetProducts_productsWithPagination_products[];
  pagination: GetProducts_productsWithPagination_pagination | null;
}

export interface GetProducts {
  productsWithPagination: GetProducts_productsWithPagination;
}

export interface GetProductsVariables {
  type: string;
  pageId?: number | null;
  limitPerPage?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface OrderProductInput {
  name: string;
  quantity: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
