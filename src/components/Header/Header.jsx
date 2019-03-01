import fastDeepEqual from 'fast-deep-equal';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import ReactAutoBinder from 'react-auto-binder';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Header.scss';
import Link from '../Link';
import starWarsLogo from './Star_Wars.svg';

@withStyles(style)
@connect(state => ({
  allMovies: state.movies.allMovies,
  movies: state.movies.movies,
}))
@ReactAutoBinder
export default class Header extends React.Component {
  static propTypes = {
    allMovies: PropTypes.arrayOf(
      PropTypes.shape({
        cast: PropTypes.arrayOf(
          PropTypes.shape({
            media: PropTypes.arrayOf(
              PropTypes.shape({
                src: PropTypes.string.isRequired,
                type: PropTypes.oneOf(['image', 'youtube']).isRequired,
              }),
            ).isRequired,
          }),
        ).isRequired,
      }),
    ).isRequired,
    query: PropTypes.shape({
      castName: PropTypes.string,
      order: PropTypes.string,
      movieTitle: PropTypes.string,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      query: props.query || {},
    };
  }
  static getDerivedStateFromProps(props, state) {
    const stateChange = {};
    if (!fastDeepEqual(props.movies, state.movies)) {
      stateChange.movies = props.movies;
    }
    if (!fastDeepEqual(props.query, state.query)) {
      stateChange.query = props.query;
    }
    return stateChange;
  }
  getCast() {
    if (!this.props.allMovies) return [];
    let movies;
    if (!this.state.query || !this.state.query.movieTitle) {
      movies = this.props.allMovies;
    } else {
      const movieTitle = decodeURIComponent(this.state.query.movieTitle);
      movies = [this.props.allMovies.find(movie => movie.title === movieTitle)];
    }
    const cast = movies.reduce(
      (castList, movie) => [...castList, ...movie.cast],
      [],
    );
    const mergedCast = cast.reduce(
      (mergedCastObj, castItem) => ({
        ...mergedCastObj,
        [castItem.castName]: castItem,
      }),
      {},
    );
    const topCast = Object.entries(mergedCast);
    topCast.sort((a, b) => a[1].castName.localeCompare(b[1].castName));
    // topCast.sort((a, b) => b[1].occurencies - a[1].occurencies);
    return topCast.map(entry => entry[1]).map(castItem => ({
      src: castItem.media.find(media => media.type === 'image').src,
      castName: castItem.castName,
    }));
  }
  getCastLink(castName) {
    if (this.isCastActive(castName)) {
      const qs = queryString.stringify({
        ...this.state.query,
        castName: undefined,
      });
      return qs ? `?${qs}` : '.';
    }
    return `?${queryString.stringify(
      {
        ...this.state.query,
        movieTitle: undefined,
        castName,
      },
      { strict: true },
    )}`;
  }
  getReleaseOrderLink() {
    const qs = queryString.stringify({
      ...this.state.query,
      order: undefined,
    });
    return qs ? `?${qs}` : '.';
  }
  getTimelineOrderLink() {
    return `?${queryString.stringify({
      ...this.state.query,
      order: 'timeline',
    })}`;
  }
  isCastActive(castName) {
    if (!this.state.query) {
      return false;
    }
    return decodeURIComponent(this.state.query.castName) === castName;
  }
  isInTimelineOrder() {
    if (!this.state.query) {
      return false;
    }
    return this.state.query.order === 'timeline';
  }
  render() {
    return (
      <div className={style.root}>
        <div className={style.navigation}>
          <Link
            className={this.isInTimelineOrder() ? undefined : style.activeLink}
            to={this.getReleaseOrderLink()}
          >
            Release date
          </Link>
          <Link
            className={this.isInTimelineOrder() ? style.activeLink : undefined}
            to={this.getTimelineOrderLink()}
          >
            Chronological order
          </Link>
        </div>
        <Link className={style.container} to=".">
          <img className={style.logo} src={starWarsLogo} alt="Star Wars" />
        </Link>
        <div className={style.portraits}>
          {this.getCast().map(cast => (
            <Link
              className={style.castLink}
              key={cast.castName}
              style={
                this.isCastActive(cast.castName)
                  ? {
                      width: '60px',
                    }
                  : undefined
              }
              to={this.getCastLink(cast.castName)}
            >
              <div
                className={style.portraitContainer}
                style={
                  this.isCastActive(cast.castName)
                    ? {
                        height: '50px',
                        width: '50px',
                      }
                    : undefined
                }
                to={this.getCastLink(cast.castName)}
              >
                <img
                  alt={cast.castName}
                  className={style.portrait}
                  src={cast.src}
                  title={cast.castName}
                />
              </div>
              <span
                className={style.castName}
                style={
                  this.isCastActive(cast.castName)
                    ? {
                        display: 'initial',
                      }
                    : undefined
                }
              >
                {cast.castName}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
