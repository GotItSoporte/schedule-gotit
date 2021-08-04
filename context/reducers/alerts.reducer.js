import {
  ALERT_SHOW,
  ALERT_HIDE
} from '../types';

const alertReducer = ( state, action ) => {
  const { type, payload } = action;
  switch ( type ) {
    case ALERT_SHOW:
      return ({
        ...state ,
        alert : payload,
      });
    case ALERT_HIDE:
      return ({
        ...state ,
        alert : null,
      });
    default:
      return state;
  }
}

export default alertReducer;