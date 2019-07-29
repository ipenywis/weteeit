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

//==============================================================
// END Enums and Input Objects
//==============================================================
