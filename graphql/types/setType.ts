const { gql } = require('apollo-server-lambda');

export const SetType = gql`
  type Set {
      id: Int,
      date: String
  }
`;