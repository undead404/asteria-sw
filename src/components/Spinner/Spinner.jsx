import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import style from './Spinner.scss';

@withStyles(style)
export default class Spinner extends React.Component {
  render() {
    return (
      <div className={style.root}>
        <div className={style.container}>
          <div />
          <div className={style.dot1} />
          <div className={style.dot2} />
        </div>
      </div>
    );
  }
}
