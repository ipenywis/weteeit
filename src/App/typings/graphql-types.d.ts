/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_PRODUCT
// ====================================================

export interface GET_PRODUCT_product {
  __typename: "Product";
  id: number;
  name: string;
}

export interface GET_PRODUCT {
  product: GET_PRODUCT_product;
}

export interface GET_PRODUCTVariables {
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_products {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  type: string;
  imageUrl: string;
}

export interface GetProducts {
  products: GetProducts_products[];
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
