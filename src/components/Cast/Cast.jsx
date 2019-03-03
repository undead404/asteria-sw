import fastDeepEqual from 'fast-deep-equal';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import ReactAutoBinder from 'react-auto-binder';
import { connect } from 'react-redux';
import Link from '../Link';
import style from './Cast.scss';

@withStyles(style)
@connect(state => ({
  cast: state.movies.cast,
  query: state.query.query,
}))
@ReactAutoBinder
export default class Cast extends React.Component {
  static propTypes = {
    cast: PropTypes.arrayOf(
      PropTypes.shape({
        castName: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
      }),
    ).isRequired,
    query: PropTypes.shape({
      castName: PropTypes.string,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (fastDeepEqual(props.query, state.query)) return {};
    return {
      query: props.query,
    };
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
  isCastActive(castName) {
    if (!this.state.query) {
      return false;
    }
    return decodeURIComponent(this.state.query.castName) === castName;
  }
  render() {
    return (
      <div className={style.root}>
        {this.props.cast.map(cast => (
          <Link
            className={style.link}
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
              className={style.name}
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
    );
  }
}
