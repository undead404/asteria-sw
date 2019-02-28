/** * Queries ** */
import {
  itemsSchema as GetMovies,
  rootSchema,
  dataSchema as GetMoviesResponse,
  schema as Movie,
  queries as GetMoviesQueries,
  // resolvers as GetMoviesResolver,
} from './asteriainc.se/GetMovies';

export const schema = [
  ...rootSchema,
  ...GetMovies,
  ...Movie,
  ...GetMoviesResponse,
];

export const queries = GetMoviesQueries;

// export const resolvers = GetMoviesResolver;
