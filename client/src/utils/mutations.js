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
    # $packageId: String,
    # $name: String,
    # $description: String, 
    # $image: String,
    # $country: String,
    # $price: Float,
    # $discount: Int,
    # $quantity: Int,
    # $rating: Int,
    # $departure: String,
    # $duration: Int,
    # $allinclusive: Boolean,
    # $activities: Boolean,
  ) {
    addFavourite(
      _id: $_id
      # packageId: $packageId
      # name: $name,
      # description: $description, 
      # image: $image,
      # country: $country,
      # price: $price,
      # discount: $discount,
      # quantity: $quantity,
      # rating: $rating,
      # departure: $departure,
      # duration: $duration,
      # allinclusive: $allinclusive,
      # activities: $activities,
    ) {
      firstName
      lastName
      # orders {
      #   _id
      #   purchaseDate
      #   products {
      #     _id
      #     packageId
      #     name
      #     description
      #     image
      #     country
      #     price
      #     discount
      #     quantity
      #     rating
      #     departure
      #     duration
      #     allinclusive
      #     activities
      #   }
      # }
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
      # orders {
      #   _id
      #   purchaseDate
      #   products {
      #     _id
      #     packageId
      #     name
      #     description
      #     image
      #     country
      #     price
      #     discount
      #     quantity
      #     rating
      #     departure
      #     duration
      #     allinclusive
      #     activities
      #     category {
      #       region
      #     }
      #   }
      # }
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
      # orders {
      #   _id
      #   purchaseDate
      #   products {
      #     _id
      #     packageId
      #     name
      #     description
      #     image
      #     country
      #     price
      #     discount
      #     quantity
      #     rating
      #     departure
      #     duration
      #     allinclusive
      #     activities
      #     category {
      #       region
      #     }
      #   }
      # }
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