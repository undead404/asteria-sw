export const itemsSchema = [
  `
    type MovieItems {
        # The news item's title
        items: [MovieItem]
      }
  `,
];

export const rootSchema = [
  `
  type RootResponse {
    data: MoviesResponse
  }
  `,
];

export const dataSchema = [
  `
  type MoviesResponse {
    movies: MovieItems
  }
  `,
];

export const schema = [
  `
  # A single movie
  type MovieItem {
    # The news item's title
    title: String

    rating: Float

    release: String
  }
`,
];

export const queries = [
  `
  # Retrieves movies
  movies: MovieItems
`,
];
