import WebFont from 'webfontloader';
import { FONTS_LOADED } from '../constants';

export default function loadFonts() {
  return async dispatch => {
    await new Promise(resolve =>
      WebFont.load({
        active: resolve,
        google: {
          families: ['Open Sans:200,400', 'Oswald:200,400'],
        },
      }),
    );
    return dispatch({
      loaded: true,
      type: FONTS_LOADED,
    });
  };
}
