import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const uri = process.env.hasOwnProperty('API_SERVER_HOST') ? process.env.API_SERVER_HOST : '/api'
const httpLink = createHttpLink({ uri, credentials: "include" })
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  console.log('uri> ', uri)
  if (token) {
    operation.setContext({
      headers: {
        authorization: token,
      },
    })
  }
  return forward(operation)
})

const errorLink = onError(({ response, operation, graphQLErrors, networkError }) => {
  console.log('response> ', response)
  console.log('operation> ', operation)
  // if (graphQLErrors) {
  //   return graphQLErrors.map(({ message, locations, path }) => {
  //     console.log(
  //       `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
  //     )
  //   })
  // }
  // if (networkError.statusCode === 401) {
  //   return console.log('should be logout')
  // }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
})

export default client
