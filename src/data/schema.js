import { makeExecutableSchema } from 'graphql-tools';

import { schema as MoviesSchema } from './graphql/Movies/schema';

const MoviesQuery = [
  `
  # # React-Starter-Kit Querying API
  # ### This GraphQL schema was built with [Apollo GraphQL-Tools](https://github.com/apollographql/graphql-tools)
  # _Build, mock, and stitch a GraphQL schema using the schema language_
  #
  # **[Schema Language Cheet Sheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)**
  #
  # 1. Use the GraphQL schema language to [generate a schema](https://www.apollographql.com/docs/graphql-tools/generate-schema.html) with full support for resolvers, interfaces, unions, and custom scalars. The schema produced is completely compatible with [GraphQL.js](https://github.com/graphql/graphql-js).
  # 2. [Mock your GraphQL API](https://www.apollographql.com/docs/graphql-tools/mocking.html) with fine-grained per-type mocking
  # 3. Automatically [stitch multiple schemas together](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html) into one larger API
  type MoviesQuery {
    movies: MoviesResponse
  }
`,
];

const SchemaDefinition = [
  `
  schema {
    query: MoviesQuery
  }
`,
];

const schema = [...SchemaDefinition, ...MoviesQuery, ...MoviesSchema];

export default makeExecutableSchema({
  typeDefs: schema,
  // resolvers: MoviesResolvers,
  ...(__DEV__ ? { log: e => console.error(e.stack) } : {}),
});
