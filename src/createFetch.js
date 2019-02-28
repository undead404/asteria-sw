/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
export default function createFetch(
  fetch,
  { baseUrl, cookie, schema, graphql },
) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST', // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    // credentials: baseUrl ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : null),
    },
  };

  return async (url, options) => {
    console.info('fetch', url, options);
    const isGraphQL = true;
    if (schema && graphql && isGraphQL) {
      // We're SSR, so route the graphql internal to avoid latency
      const query = JSON.parse(options.body);
      console.info(query);
      const result = await graphql(
        schema,
        query,
        { request: {} }, // fill in request vars needed by graphql
        null,
        query.variables,
      );
      return Promise.resolve({
        status: result.errors ? 400 : 200,
        json: () => Promise.resolve(result),
      });
    }

    return isGraphQL || url.startsWith('/api')
      ? fetch(`${baseUrl}${url}`, {
          ...defaults,
          ...options,
          headers: {
            ...defaults.headers,
            ...(options && options.headers),
          },
        })
      : fetch(url, options);
  };
}
