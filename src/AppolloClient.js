import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const uri = process.env.REACT_APP_API
const credentials = (process.env.NODE_ENV === 'production' ? { credentials: 'include' } : {})
const httpLink = createUploadLink({
  uri,
  ...credentials,
})
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
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
