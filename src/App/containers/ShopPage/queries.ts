import { gql } from "apollo-boost";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      type
      imageUrl
    }
  }
`;
