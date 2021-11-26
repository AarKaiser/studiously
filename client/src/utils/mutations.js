import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
login(email: $email, password: $password){
token
user {
    _id
    username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_GOAL = gql`
mutation addGoal($goalData: goalInput!){
    addGoal(goalData: $goalData) {
        _id
        username
        email 
        addedGoal {
            goalId
            description
            name
        }
    }
}
`;

export const GET_GOAL = gql`
mutation getGoal($goalData: goalInput!){
    getGoal(goalData: $goalData) {
        _id
        username
        email 
        gotGoal {
            goalId
            description
            name
        }
    }
}
`;


export const SAVE_GOAL = gql`
mutation saveGoal($goalData: goalInput!){
    saveGoal(goalData: $goalData) {
        _id
        username
        email 
        savedGoals {
            goalId
            authors
            description
            name
        }
    }
}
`;

export const REMOVE_GOAL = gql`
mutation removeGoal($goalId: String!){
    removeGoal(goalId: $goalId) {
        _id
        username
        email 
        savedGoals {
            goalId
            authors
            description
            name
        }
    }
}
`;