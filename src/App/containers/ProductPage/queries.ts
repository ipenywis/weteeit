import { gql } from "apollo-boost";

export const GET_PRODUCT = gql`
  query GetProduct($name: String!) {
    product: productByName(name: $name) {
      id
      name
      price
      type
      imageUrl
    }
  }
`;
