import { gql } from "apollo-boost";

export const GET_SHIPPINGS = gql`
  query GetShipping {
    shippings {
      id
      wilaya
      price
    }
  }
`;
