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

export const GET_PROFILE_USERNAME = gql`
  query getProfileUsername($username: String!) {
    profile(username: $username) {
      _id
      username
      email
    }
  }
`

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      _id
      comment
      profile {
        _id
        username
        email
      }
    }
  }
`
