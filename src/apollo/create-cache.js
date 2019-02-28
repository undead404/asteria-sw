import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

function dataIdFromObject(obj) {
  // eslint-disable-next-line no-underscore-dangle
  switch (obj.__typename) {
    case 'Movie':
      return obj.link ? `Movie:${obj.link}` : defaultDataIdFromObject(obj);
    default:
      return defaultDataIdFromObject(obj);
  }
}

export default function createCache() {
  // https://www.apollographql.com/docs/react/basics/caching.html#configuration
  return new InMemoryCache({
    dataIdFromObject,
  });
}
