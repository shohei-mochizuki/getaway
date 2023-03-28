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
    $packageId: String,
    $name: String,
    $description: String, 
    $image: String,
    $country: String,
    $price: Float,
    $discount: Int,
    $quantity: Int,
    $rating: Int,
    $departure: String,
    $duration: Int,
    $allinclusive: Boolean,
    $activities: Boolean,
    $category: ID, 
  ) {
    addFavourite(
      packageId: $packageId
      name: $name,
      description: $description, 
      image: $image,
      country: $country,
      price: $price,
      discount: $discount,
      quantity: $quantity,
      rating: $rating,
      departure: $departure,
      duration: $duration,
      allinclusive: $allinclusive,
      activities: $activities,
      category: $category, 
    ) {
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
          region
        }
      }
    }
  }
`;

export const REMOVE_FAVOURITE = gql`
  mutation removeFavourite($packageId: String!) {
    removeFavourite(packageId: $packageId) {
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
          region
        }
      }
    }
  }
`;