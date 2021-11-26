const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    goalCount: Int
    savedGoals: [Goal]
  }
type Goal {
    _id:ID
    description: String
    name:String
}
input goalInput {
    description: String
    name: String
    
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