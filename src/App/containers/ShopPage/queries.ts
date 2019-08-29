import { gql } from "apollo-boost";

export const GET_PRODUCTS = gql`
  query GetProducts($type: String!, $pageId: Int, $limitPerPage: Int) {
    productsWithPagination: productsByType(
      type: $type
      pageId: $pageId
      limitPerPage: $limitPerPage
    ) {
      products {
        id
        name
        price
        type
        imageUrl
      }
      pagination {
        pageId
        perPage
        numPages
        count
      }
    }
  }
`;
