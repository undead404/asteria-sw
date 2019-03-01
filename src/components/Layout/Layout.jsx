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
    query: PropTypes.shape({
      castName: PropTypes.string,
      order: PropTypes.string,
      movieTitle: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <div
        className={style.root}
        style={{ backgroundImage: `url(${nightSky})` }}
      >
        <Header query={this.props.query} />
        {this.props.children}
        <div className={style.credits}>vitalii.perehonchuk@eliftech.com</div>
      </div>
    );
  }
}
