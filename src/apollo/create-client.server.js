import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import createCache from './create-cache';

export default function createApolloClient() {
  // console.info(schema);
  const link = from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.warn(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.warn(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      fetch,
      uri: 'http://starwars.asteriainc.se/graphql',
    }),
  ]);

  return new ApolloClient({
    link,
    cache: createCache(),
    ssrMode: true,
    queryDeduplication: true,
    uri: 'http://starwars.asteriainc.se/graphql',
  });
}
