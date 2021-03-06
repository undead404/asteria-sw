import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import style from './Layout.scss';
import Header from '../Header';
import nightSky from './night-sky.png';

@withStyles(normalizeCss, style)
export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div
        className={style.root}
        style={{ backgroundImage: `url(${nightSky})` }}
      >
        <Header />
        {this.props.children}
        <div className={style.credits}>
          <span>vitalii.perehonchuk</span>
          <span>@eliftech.com</span>
        </div>
      </div>
    );
  }
}
