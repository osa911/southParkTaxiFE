import { gql } from "apollo-boost";

export const ADD_USER = gql`
  mutation addUser($name: String!, $password: String!, $email: String!) {
    addUser(name: $name, password: $password, email: $email) {
      id
      name
    }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email)
  }
`
