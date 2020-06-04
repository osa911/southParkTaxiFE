import { gql } from "apollo-boost";

export const CREATE_CAR = gql`
	mutation createCar($title: String!, $govNumber: String!, $ownerId: String!, $price: Float, $mileage: Float) {
		createCar(title: $title, govNumber: $govNumber, ownerId: $ownerId, price: $price, mileage: $mileage) {
			id
			govNumber
		}
	}
`

export const GET_USERS_LIST = gql`
	query getUsersList {
		getUsersList {
			id
			name
      email
		}
	}
`

