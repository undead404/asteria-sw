import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Timeline.scss';
import Movie from '../../components/Movie';
import Spinner from '../../components/Spinner';

function getMaxDuration(movies) {
  if (!movies) return 0;
  return movies.reduce(
    (currentMax, movie) =>
      movie.duration > currentMax ? movie.duration : currentMax,
    0,
  );
}

function getMinDuration(movies) {
  if (!movies) return Infinity;
  return movies.reduce(
    (currentMin, movie) =>
      movie.duration < currentMin ? movie.duration : currentMin,
    Infinity,
  );
}

@withStyles(style)
@connect(state => ({
  error: state.movies.error,
  fontsLoaded: state.fonts.loaded,
  maxDuration: getMaxDuration(state.movies.movies),
  minDuration: getMinDuration(state.movies.movies),
  movies: state.movies.movies,
  query: state.query.query,
}))
export default class Timeline extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    fontsLoaded: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    maxDuration: PropTypes.number,
    minDuration: PropTypes.number,
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        release: PropTypes.string,
      }),
    ).isRequired,
  };
  static defaultProps = {
    error: null,
    fontsLoaded: false,
    maxDuration: 0,
    minDuration: Infinity,
  };

  render() {
    return (
      <div className={style.root}>
        <div className={style.container}>
          <div>
            {process.env.BROWSER &&
              this.props.error && (
                <div className={style.error}>{this.props.error}</div>
              )}
          </div>
          <div className={style.moviesContainer}>
            {this.props.movies && this.props.movies.length > 0 ? (
              this.props.movies.map(movie => (
                <Movie
                  key={movie.title}
                  maxDuration={this.props.maxDuration}
                  minDuration={this.props.minDuration}
                  movie={movie}
                  width={`${80 / this.props.movies.length}vw`}
                />
              ))
            ) : (
              <p>No star wars yet.</p>
            )}
          </div>
        </div>
        <Spinner />
      </div>
    );
  }
}
