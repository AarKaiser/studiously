import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      savedGoals {
        _id
        description
        name
        duration
        dateCreated
        completed
      }
    }
  }
`;
