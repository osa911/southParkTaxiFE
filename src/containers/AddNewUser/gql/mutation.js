import { gql } from "apollo-boost";

export const CREATE_USER = gql`
	mutation createUser($name: String!, $password: String!, $email: String!) {
		createUser(name: $name, password: $password, email: $email) {
			id
			name
		}
	}
`
