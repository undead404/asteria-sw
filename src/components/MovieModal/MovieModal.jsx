// import queryString from 'query-string';
import React from 'react';
import ReactAutoBinder from 'react-auto-binder';
import ReactModal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPlayer from 'react-player';
import style from './MovieModal.scss';
// import Link from '../Link';

@withStyles(style)
@ReactAutoBinder
export default class Movie extends React.Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    movie: PropTypes.shape({
      cast: PropTypes.arrayOf(
        PropTypes.shape({
          castName: PropTypes.string.isRequired,
          media: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string.isRequired,
              type: PropTypes.oneOf(['image', ['youtube']]).isRequired,
            }),
          ).isRequired,
          name: PropTypes.string.isRequired,
        }),
      ).isRequired,
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
    show: PropTypes.bool,
  };
  static defaultProps = {
    show: false,
  };
  getHumanizedDuration() {
    const hoursNum = Math.trunc(this.props.movie.duration / 60);
    return `${hoursNum}h${this.props.movie.duration - 60 * hoursNum}m`;
  }
  getPlayer() {
    const youtubeMedia = this.props.movie.media.find(
      media => media.type === 'youtube',
    );
    if (!youtubeMedia) return undefined;
    return (
      <ReactPlayer
        className={style.player}
        height="640px"
        light
        style={{ minHeight: '380px' }}
        url={youtubeMedia.src}
        width="720px"
      />
    );
  }
  getPoster() {
    if (!this.props.movie) return '';
    return this.props.movie.media.find(media => media.type === 'image').src;
  }
  render() {
    const player = this.getPlayer();
    return (
      <ReactModal
        classNames={{ modal: style.modal }}
        open={this.props.show}
        onClose={this.props.close}
        // style={{padding: '0px'}}
        // style={{
        //   content: {
        //     color: '#212121',
        //     margin: '0 auto',
        //     maxWidth: '720px',
        //     overflow: 'initial',
        //     padding: '0px',
        //     top: '50vh',
        //     zIndex: 2,
        //   },
        //   overlay: {
        //     position: 'absolute',
        //     // backgroundColor: 'transparent',
        //     // position: 'initial',
        //   },
        // }}
      >
        <style>{`
          .react-player__preview {
            min-height: 640px;
            min-width: 720px;
          }
          button[class*='closeButton'] path {
            fill: white;
          }
        `}</style>
        <div
          className={style.posterContainer}
          style={player ? { top: '0px' } : undefined}
        >
          <img
            alt={this.props.movie.title}
            className={style.poster}
            src={this.getPoster()}
          />
        </div>
        {player || <div style={{ height: '140px', width: '100%' }} />}
        <h1 className={style.title}>{this.props.movie.title}</h1>
        <div className={style.info}>
          <div className={style.infoItem}>
            <div className={style.infoLabel}>Release</div>
            <div className={style.infoData}>
              {this.props.movie.release.slice(0, 4)}
            </div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoLabel}>Rating</div>
            <div className={style.infoData}>{this.props.movie.rating}</div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoLabel}>Length</div>
            <div className={style.infoData}>{this.getHumanizedDuration()}</div>
          </div>
        </div>
        <h2 className={style.castHead}>Cast</h2>
        <div className={style.cast}>
          {this.props.movie.cast.map(castItem => (
            <div key={castItem.name} className={style.castItem}>
              <div className={style.portraitContainer}>
                <img
                  alt={castItem.name}
                  className={style.portrait}
                  src={castItem.media.find(media => media.type === 'image').src}
                />
              </div>
              <span className={style.realName}>{castItem.name}</span>
              <span className={style.characterName}>{castItem.castName}</span>
            </div>
          ))}
        </div>
      </ReactModal>
    );
  }
}
