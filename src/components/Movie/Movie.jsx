import queryString from 'query-string';
import React from 'react';
import ReactAutoBinder from 'react-auto-binder';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Movie.scss';
import Link from '../Link';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@withStyles(style)
@ReactAutoBinder
export default class Movie extends React.Component {
  static propTypes = {
    maxDuration: PropTypes.number.isRequired,
    minDuration: PropTypes.number.isRequired,
    movie: PropTypes.shape({
      duration: PropTypes.number.isRequired,
      inactive: PropTypes.bool,
      media: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
      rating: PropTypes.number.isRequired,
      release: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    query: PropTypes.shape({
      castName: PropTypes.string,
      order: PropTypes.string,
      movieTitle: PropTypes.string,
    }).isRequired,
    width: PropTypes.string.isRequired,
  };
  getActiveMovieTitle() {
    return decodeURIComponent(this.props.query.movieTitle);
  }
  getImageSrc() {
    if (!this.props.movie) return '';
    return this.props.movie.media.find(media => media.type === 'image').src;
  }
  getLink() {
    if (this.isActive()) {
      return `?${queryString.stringify({
        ...this.props.query,
        movieTitle: undefined,
      })}`;
    }
    return `?${queryString.stringify(
      {
        ...this.props.query,
        castName: undefined,
        movieTitle: this.props.movie.title,
      },
      { strict: true },
    )}`;
  }
  getReleaseDate() {
    if (!this.props.movie) return '';
    const date = new Date(this.props.movie.release.slice(0, 10));
    return `${
      MONTH_NAMES[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }
  getTopOffset() {
    if (!this.props.movie) return '';
    return `calc(30vh * ${1 -
      (this.props.movie.duration - this.props.minDuration) /
        (this.props.maxDuration - this.props.minDuration)})`;
  }
  isActive() {
    return this.getActiveMovieTitle() === this.props.movie.title;
  }
  render() {
    return (
      <Link
        key={this.props.movie.title}
        className={`${style.root} ${
          this.props.movie.inactive ? style.inactive : undefined
        }`}
        style={{
          // backgroundColor: this.isActive()
          //   ? 'rgba(58, 90, 95, .25)'
          //   : undefined,
          width: this.props.width,
        }}
        to={this.getLink()}
      >
        <div
          className={style.posterWrapper}
          style={{ top: this.getTopOffset(), width: this.props.width }}
        >
          <div className={style.posterContainer}>
            <img
              alt={this.props.movie.title}
              className={style.poster}
              src={
                this.props.movie.media.find(media => media.type === 'image').src
              }
            />
          </div>
          <div className={style.titleContainer}>
            <div className={style.title}>{this.props.movie.title}</div>
          </div>
        </div>
        <div className={style.release}>{this.getReleaseDate()}</div>
        <div className={style.axisContainer}>
          <div className={style.axis} />
        </div>
      </Link>
    );
  }
}
