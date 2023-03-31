import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
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
          region
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_FAVOURITE = gql`
  mutation addFavourite(
    $_id: ID,
  ) {
    addFavourite(
      _id: $_id
    ) {
      firstName
      lastName
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
          region
        }
      }
    }
  }
`;

export const REMOVE_FAVOURITE = gql`
  mutation removeFavourite($_id: String!) {
    removeFavourite(_id: $_id) {
      firstName
      lastName
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
          region
        }
      }
    }
  }
`;

export const CHANGE_NAME = gql`
  mutation changeName($firstName: String $lastName: String) {
    changeName(firstName: $firstName lastName: $lastName) {
      firstName
      lastName
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
          region
        }
      }
    }
  }
`;