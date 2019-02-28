/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import propTypes from 'prop-types';
import React from 'react';
import ReactAutoBinder from 'react-auto-binder';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Header.scss';
import Link from '../Link';
import starWarsLogo from './Star_Wars.svg';

@withStyles(style)
@connect(state => ({
  movies: state.movies.movies,
}))
@ReactAutoBinder
export default class Header extends React.Component {
  static propTypes = {
    movies: propTypes.arrayOf(
      propTypes.shape({
        cast: propTypes.arrayOf(
          propTypes.shape({
            media: propTypes.arrayOf(
              propTypes.shape({
                src: propTypes.string.isRequired,
                type: propTypes.oneOf(['image', 'youtube']).isRequired,
              }),
            ).isRequired,
          }),
        ).isRequired,
      }),
    ).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      movies: props.movies,
    };
    console.info(this.state);
  }

  getCast() {
    if (!this.state.movies) return [];
    const cast = this.state.movies.reduce(
      (castList, movie) => [...castList, ...movie.cast],
      [],
    );
    const mergedCast = cast.reduce(
      (mergedCastObj, castItem) => ({
        ...mergedCastObj,
        [castItem.name]: {
          ...castItem,
          occurencies:
            (mergedCastObj[castItem.name]
              ? mergedCastObj[castItem.name].occurencies
              : 0) + 1,
        },
      }),
      {},
    );
    const topCast = Object.entries(mergedCast);
    topCast.sort((a, b) => b[1].occurencies - a[1].occurencies);
    console.info(topCast);
    return topCast
      .slice(0, 5)
      .map(entry => entry[1])
      .map(castItem => ({
        src: castItem.media.find(media => media.type === 'image').src,
        name: castItem.name,
      }));
  }
  static getDerivedStateFromProps(props) {
    return {
      movies: props.movies,
    };
  }
  render() {
    return (
      <div className={style.root}>
        <Link className={style.container} to="/">
          <img className={style.logo} src={starWarsLogo} alt="Star Wars" />
        </Link>
        <div className={style.portraits}>
          {this.getCast().map(cast => (
            <div className={style.portraitContainer} key={cast.name}>
              <img
                alt={cast.name}
                className={style.portrait}
                src={cast.src}
                title={cast.name}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
