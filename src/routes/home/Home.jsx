import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.scss';

@withStyles(style)
@connect(state => ({
  error: state.movies.error,
  movies: state.movies.movies,
}))
export default class Home extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        release: PropTypes.string,
      }),
    ).isRequired,
  };
  static defaultProps = {
    error: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      error: props.error,
      movies: props.movies,
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      error: props.error,
      movies: props.movies,
    };
  }

  render() {
    return (
      <div className={style.root}>
        <div className={style.container}>
          <h1>Star Wars movies</h1>
          <div>
            {this.state.error && (
              <div className={style.error}>{this.state.error}</div>
            )}
          </div>
          <div>
            {this.state.movies && this.state.movies.length > 0 ? (
              this.state.movies.map(item => (
                <article key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <h5>{item.release}</h5>
                  </div>
                  <div>{item.rating}</div>
                  <img
                    src={item.media.find(media => media.type === 'image').src}
                    alt={item.title}
                  />
                </article>
              ))
            ) : (
              <p>No star wars yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
