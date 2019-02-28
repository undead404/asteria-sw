function createGraphqlRequest(client) {
  return async function graphqlRequest(query) {
    return client.query(query);
  };
}

export default function createHelpers({ client, fetch, history }) {
  return {
    fetch,
    history,
    graphqlRequest: createGraphqlRequest(client),
  };
}
