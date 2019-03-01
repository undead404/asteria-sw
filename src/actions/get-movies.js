import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
} from '../constants';
import moviesQuery from '../graphql-queries/movies.graphql';
import makeRequest from '../utils/make-request';

function compareByRelease(movie1, movie2) {
  return movie1.release.localeCompare(movie2.release);
}
function compareByTimeline(movie1, movie2) {
  const aby1 = movie1.trivia.universeTimeline.indexOf('ABY');
  const aby2 = movie2.trivia.universeTimeline.indexOf('ABY');
  if (aby1 !== -1 && aby2 === -1) {
    return 1;
  }
  if (aby1 === -1 && aby2 !== -1) {
    return -1;
  }
  if (aby1 !== -1 && aby2 !== -1) {
    return (
      parseInt(movie1.trivia.universeTimeline, 10) -
      parseInt(movie2.trivia.universeTimeline, 10)
    );
  }
  return (
    parseInt(movie2.trivia.universeTimeline, 10) -
    parseInt(movie1.trivia.universeTimeline, 10)
  );
}

const DURATIONS = {
  'Episode I – The Phantom Menace': 136,
  'Episode II – Attack of the Clones': 142,
  'Episode III – Revenge of the Sith': 140,
  'Episode IV – A New Hope': 121,
  'Episode V – The Empire Strikes Back': 124,
  'Episode VI – Return of the Jedi': 131,
  'Episode VII – The Force Awakens': 136,
  'Episode VIII – The Last Jedi': 152,
};

function fillMoviesDurations(movies) {
  return movies.map(movie => ({
    ...movie,
    duration: DURATIONS[movie.title],
  }));
}

export default function getMovies(params) {
  return makeRequest(
    [
      function requestMovies() {
        return {
          ...params,
          type: GET_MOVIES_REQUEST,
        };
      },
      function receiveMovies(response) {
        const allMovies = response.data.movies.items;
        let movies = allMovies;
        if (params.castName) {
          movies = movies.filter(movie =>
            movie.cast.some(cast => cast.castName === params.castName),
          );
        }
        return {
          allMovies,
          error: null,
          movies: fillMoviesDurations(
            movies.sort(
              params.order && params.order === 'timeline'
                ? compareByTimeline
                : compareByRelease,
            ),
          ),
          type: GET_MOVIES_SUCCESS,
        };
      },
      function receiveMoviesError(error) {
        return {
          error,
          type: GET_MOVIES_FAILURE,
        };
      },
    ],
    moviesQuery,
  );
}
