import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
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
      }
    }
  }
`;

export const REMOVE_PROFILE = gql`
  mutation removeProfile($profileId: ID!) {
    removeProfile(profileId: $profileId) {
      _id
      username
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $profileId: ID!
    $username: String
    $email: String
    $password: String
  ) {
    updateProfile(
      profileId: $profileId
      username: $username
      email: $email
      password: $password
    ) {
      _id
      username
      email
    }
  }
`;
