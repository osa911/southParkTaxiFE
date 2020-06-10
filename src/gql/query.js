import { gql } from "apollo-boost";

export const GET_USERS_LIST_FOR_SELECT = gql`
	query getUsersList {
		getUsersList {
			id
			name
			email
		}
	}
`
export const GET_USER_INFO = gql`
	query me {
		me {
			id
			name
			role
		}
	}
`

export const GET_USERS_LIST = gql`
	query getUsersList {
		getUsersList {
			id
			name
			email
			role
			cars {
				id
				title
				govNumber
			}
		}
	}
`

export const GET_CARS_LIST = gql`
	query getCarsList {
		getCarsList {
			id
			title
			govNumber
			price
			mileage
			user {
				id
				name
			}
		}
	}
`
