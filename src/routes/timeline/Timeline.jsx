import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Timeline.scss';
import Movie from '../../components/Movie';

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
  movies: state.movies.movies,
}))
export default class Timeline extends React.Component {
  static propTypes = {
    error: PropTypes.string,
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
  };
  constructor(props) {
    super(props);
    this.state = {
      error: props.error,
      maxDuration: getMaxDuration(props.movies),
      minDuration: getMinDuration(props.movies),
      movies: props.movies,
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      error: props.error,
      maxDuration: getMaxDuration(props.movies),
      minDuration: getMinDuration(props.movies),
      movies: props.movies,
    };
  }

  render() {
    return (
      <div className={style.root}>
        <div className={style.container}>
          <div>
            {this.state.error && (
              <div className={style.error}>{this.state.error}</div>
            )}
          </div>
          <div className={style.moviesContainer}>
            {this.state.movies && this.state.movies.length > 0 ? (
              this.state.movies.map(movie => (
                <Movie
                  key={movie.title}
                  maxDuration={this.state.maxDuration}
                  minDuration={this.state.minDuration}
                  movie={movie}
                  width={`${80 / this.state.movies.length}vw`}
                />
              ))
            ) : (
              <p>No star wars yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
