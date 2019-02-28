import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import getMovies from '../../actions/get-movies';

export default async function action(context) {
  const response = await context.store.dispatch(getMovies());
  let data;
  if (!response || !response.data) {
    data = { movies: [] };
  } else {
    data = response.data;
  }
  if (!data || !data.movies) {
    data = { movies: [] };
  }
  return {
    title: 'Star Wars Saga',
    chunks: ['home'],
    component: (
      <Layout>
        <Home movies={data.movies.items} />
      </Layout>
    ),
  };
}
