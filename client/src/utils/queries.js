import { gql } from "@apollo/client";

export const GET_QUESTION = gql`
  query question {
    question {
      question
    }
  }
`;

export const GET_PROFILE = gql`
  query getProfile($id: ID!) {
    profile(_id: $id) {
      _id
      username
      email
    }
  }
`;
