const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  users:[User]!
  user(id:ID!): User
  hello: String
}

type User {
  id: ID!
  name: String
  email: String
  password: String
  isrole: Boolean!
}
`;



module.exports = typeDefs;