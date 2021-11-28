const { gql } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    email: String
    goalCount: Int
    savedGoals: [Goal]
  }
  type Goal {
    _id: ID
    description: String
    name: String
    duration: String
    dateCreated: Date
  }
  input goalInput {
    description: String
    name: String
    duration: String
    dateCreated: Date
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGoal(goalData: goalInput!): User
    removeGoal(goalId: ID!): User
  }
`;

module.exports = typeDefs;
