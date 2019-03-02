function createGraphqlRequest(client) {
  return async function graphqlRequest(query) {
    return client.query(query);
  };
}

export default function createHelpers({ client, history }) {
  return {
    history,
    graphqlRequest: createGraphqlRequest(client),
  };
}
