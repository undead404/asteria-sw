import moment from 'moment';
import React from 'react';
import ReactAutoBinder from 'react-auto-binder';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Movie.scss';

@withStyles(style)
@ReactAutoBinder
export default class Movie extends React.Component {
  static propTypes = {
    maxDuration: PropTypes.number.isRequired,
    minDuration: PropTypes.number.isRequired,
    movie: PropTypes.shape({
      duration: PropTypes.number.isRequired,
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
    width: PropTypes.string.isRequired,
  };
  getImageSrc() {
    if (!this.props.movie) return '';
    return this.props.movie.media.find(media => media.type === 'image').src;
  }
  getReleaseDate() {
    if (!this.props.movie) return '';
    const date = moment(this.props.movie.release.slice(0, 10));
    return date.format('MMMM D, YYYY');
  }
  getTopOffset() {
    if (!this.props.movie) return '';
    return `calc(30vh * ${1 -
      (this.props.movie.duration - this.props.minDuration) /
        (this.props.maxDuration - this.props.minDuration)})`;
  }
  render() {
    return (
      <article
        key={this.props.movie.title}
        className={style.root}
        style={{ width: this.props.width }}
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
      </article>
    );
  }
}
