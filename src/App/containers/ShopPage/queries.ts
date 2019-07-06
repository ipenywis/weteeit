import { gql } from "apollo-boost";

export const GET_PRODUCTS = gql`
  query GetProducts($type: String!) {
    products: productsByType(type: $type) {
      id
      name
      price
      type
      imageUrl
    }
  }
`;
