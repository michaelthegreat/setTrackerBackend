const {gql} = require('apollo-server-lambda');

export const BaseQuery = gql`
  type Query {
    _empty: String
  }
`;