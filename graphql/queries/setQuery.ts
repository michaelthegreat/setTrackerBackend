const { gql } = require('apollo-server-lambda');

export const SetQuery = gql`
  extend type Query {
      Set: [Set]
  }
`;