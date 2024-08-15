import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!, $avatar: String) {
    addProfile(username: $username, email: $email, password: $password, avatar: $avatar) {
      token
      profile {
        _id
        username
        avatar
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($comment: String!, $profileId: ID!) {
    addPost(comment: $comment, profileId: $profileId) {
      _id
      comment
      profile {
        _id
        username
        avatar
      }
    }
  }
`