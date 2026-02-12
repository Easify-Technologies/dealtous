import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($pager: Pager, $filter: ProductFilter) {
    products(pager: $pager, filter: $filter) {
      total
      results {
        id
        price
        currency
        images
        langs(codes: ["en"]) {
          code
          name
          summary
          isPrimary
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      results {
        id
        icon
        langs(codes: ["en"]) {
          name
        }
      }
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
      icon
      parent {
        id
      }
      langs(codes: ["en"]) {
        name
        summary
        isPrimary
      }
    }
  }
`;

export const GET_ADMIN_PRODUCTS = gql`
  query AdminProducts($offset: Int!, $length: Int!) {
    products(
      pager: { offset: $offset, length: $length }
    ) {
      total
      results {
        id
        price
        currency
        images
        langs(codes: ["en"]) {
          name
          summary
        }
        createdAt
      }
    }
  }
`;

export const GET_ADMIN_CATEGORIES = gql`
  query AdminCategories {
    categories {
      total
      results {
        id
        icon
        parent {
          id
        }
        langs(codes: ["en"]) {
          name
          summary
        }
      }
    }
  }
`;
