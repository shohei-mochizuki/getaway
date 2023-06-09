import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      packageId
      name
      description
      image
      country
      price
      discount
      quantity
      rating
      departure
      duration
      allinclusive
      activities
      category {
        _id
        region
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      packageId
      name
      description
      image
      country
      price
      discount
      quantity
      rating
      departure
      duration
      allinclusive
      activities
      category {
        region
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      region
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          packageId
          name
          description
          image
          country
          price
          discount
          quantity
          rating
          departure
          duration
          allinclusive
          activities
          category {
            _id
            region
          }
        }
      }
      savedProducts {
        _id
        packageId
        name
        description
        image
        country
        price
        discount
        quantity
        rating
        departure
        duration
        allinclusive
        activities
        category {
          _id
          region
        }
      }
    }
  }
`;
