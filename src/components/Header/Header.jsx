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
import Cast from '../Cast';

@withStyles(style)
@connect(state => ({
  query: state.query.query,
}))
@ReactAutoBinder
export default class Header extends React.Component {
  static propTypes = {
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
        <Cast />
      </div>
    );
  }
}
