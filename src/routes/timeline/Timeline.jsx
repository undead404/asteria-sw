import fastDeepEqual from 'fast-deep-equal';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import WebFont from 'webfontloader';
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
  movies: state.movies.movies,
  query: state.query.query,
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
      fontsLoaded: false,
      maxDuration: getMaxDuration(props.movies),
      minDuration: getMinDuration(props.movies),
      movies: props.movies || [],
    };

    if (process.env.BROWSER) {
      WebFont.load({
        active: () => {
          this.setState({
            fontsLoaded: true,
          });
        },
        google: {
          families: ['Open Sans:200,400', 'Oswald:200,400'],
        },
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    const stateChange = {};
    if (!fastDeepEqual(props.movies, state.movies)) {
      stateChange.maxDuration = getMaxDuration(props.movies);
      stateChange.minDuration = getMinDuration(props.movies);
      stateChange.movies = props.movies;
    }
    if (props.error !== state.error) {
      stateChange.error = props.error;
    }
    return stateChange;
  }

  render() {
    return (
      <div className={style.root}>
        {this.state.fontsLoaded ? (
          <div className={style.container}>
            <div>
              {process.env.BROWSER &&
                this.state.error && (
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
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
