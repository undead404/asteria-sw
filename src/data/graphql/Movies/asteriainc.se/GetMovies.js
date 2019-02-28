// import fetch from 'node-fetch';

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

// const url = `http://starwars.asteriainc.se/graphql`;

// let items = [];
// let lastFetchTask;
// let lastFetchTime = new Date(1970, 0, 1);

// export const resolvers = {
//   MoviesQuery: {
// movies() {
//   if (lastFetchTask) {
//     return lastFetchTask;
//   }

//   if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
//     lastFetchTime = new Date();
//     lastFetchTask = fetch(url, { method: 'POST' })
//       .then(response => response.json())
//       .then(data => {
//         if (data.status === 'ok') {
//           items = data.items;
//         }

//         lastFetchTask = null;
//         return items;
//       })
//       .catch(err => {
//         lastFetchTask = null;
//         throw err;
//       });

//     if (items.length) {
//       return items;
//     }

//     return lastFetchTask;
//   }

//   return items;
// },
// },
// };
