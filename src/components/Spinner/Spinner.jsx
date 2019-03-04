import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import style from './Spinner.scss';

@withStyles(style)
@connect(state => ({
  show: !state.fonts.loaded,
}))
export default class Spinner extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
  };
  render() {
    return this.props.show ? (
      <div className={style.root}>
        <div className={style.container}>
          <div />
          <div className={style.dot1} />
          <div className={style.dot2} />
        </div>
      </div>
    ) : null;
  }
}
