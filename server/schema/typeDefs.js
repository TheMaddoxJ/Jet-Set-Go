const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    locationCount: Int
    savedLocation: [Location]
  }

  type Location {
    locationId: ID!
    name: String!
    description: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input LocationInput {
    locationId: ID!
    name: String!
    description: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User  
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveLocation(locationData: LocationInput!): User
    removeLocation(locationId: ID!): User
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;