import { gql } from 'apollo-boost'

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $password: String!
    $email: String!
    $phone: String
    $role: role
  ) {
    createUser(name: $name, password: $password, email: $email, phone: $phone, role: $role) {
      id
      name
      email
    }
  }
`

export const CREATE_CAR = gql`
  mutation createCar(
    $title: String!
    $govNumber: String!
    $ownerId: String!
    $price: Float
    $mileage: Float
  ) {
    createCar(
      title: $title
      govNumber: $govNumber
      ownerId: $ownerId
      price: $price
      mileage: $mileage
    ) {
      id
      govNumber
    }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email)
  }
`

export const DELETE_REPORT = gql`
  mutation deleteReport($id: String!) {
    deleteReport(id: $id)
  }
`

export const DELETE_CAR = gql`
  mutation deleteCar($id: String!) {
    deleteCar(id: $id)
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id)
  }
`

export const UPLOAD_FILE_STREAM = gql`
  mutation uploadReportFile($file: Upload!, $date: String!) {
    uploadReportFile(file: $file, date: $date) {
      id
      title
      govNumber
    }
  }
`
