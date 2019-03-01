import React from 'react';
import Timeline from './Timeline';
import Layout from '../../components/Layout';
import getMovies from '../../actions/get-movies';

export default async function action(context) {
  await context.store.dispatch(getMovies(context.query));
  return {
    title: 'Star Wars Saga',
    chunks: ['timeline'],
    component: (
      <Layout query={context.query}>
        <Timeline query={context.query} />
      </Layout>
    ),
  };
}
