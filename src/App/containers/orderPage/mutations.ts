import { gql } from "apollo-boost";

export const STORE_ORDER = gql`
  mutation StoreOrder(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $address: String!
    $facebook_profile: String
    $wilaya: String!
    $city: String!
    $products: [OrderProductInput!]!
    $instructions: String
  ) {
    order: storeOrder(
      newOrderData: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        address: $address
        facebook_profile: $facebook_profile
        wilaya: $wilaya
        city: $city
        products: $products
        instructions: $instructions
      }
    ) {
      id
      transactionId
      firstName
      lastName
      address
      phone
      email
      facebook_profile
      wilaya
      city
      instructions
      products {
        name
        type
        price
        imageUrl
        orderProduct {
          product
          order
          quantity
        }
      }
    }
  }
`;
