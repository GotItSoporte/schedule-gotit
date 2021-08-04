import {
  ALERT_SHOW,
  ALERT_HIDE
} from '../types';

import { useReducer } from 'react';
//import 
import AlertContext, { initialstate } from '../alerts.context';
import alertReducer from '../reducers/alerts.reducer';

const AlertWrapper = ({ children }) =>{
  const [ state, dispatch ] = useReducer( alertReducer, initialstate );

  const showAlert = ( message, category ) =>{
    dispatch({
      type : ALERT_SHOW,
      payload: { message, category }
    });
    setTimeout(() =>{
      return dispatch({
        type : ALERT_HIDE,
      })
    }, 5000);
  }

  return(
    <AlertContext.Provider
      value = {{
        state,
        showAlert : showAlert 
      }}
    >
      { children }
    </AlertContext.Provider>
  )
}

export default AlertWrapper;