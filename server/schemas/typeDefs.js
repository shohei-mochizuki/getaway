const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    region: String
  }

  type Product {
    _id: ID
    packageId: String
    name: String
    description: String
    image: String
    country: String
    price: Float
    discount: Int
    quantity: Int
    rating: Int
    departure: String
    duration: Int
    allinclusive: Boolean
    activities: Boolean
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    savedProducts: [Product]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, region: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    addFavourite(_id: ID): User
    removeFavourite(_id: String): User
  }
`;

module.exports = typeDefs;
