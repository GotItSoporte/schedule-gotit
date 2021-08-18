import {
  USER_SIGN_UP,
  SER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_ERROR,  
  USER_LOGIN,         
  USER_LOGIN_SUCESS,  
  USER_LOGIN_ERROR,   
  USER_AUTH,   
  USER_GET_PROJECTS,  
  USER_ERROR, 
  USER_LOGOUT,  
} from '../types';
// Alerts
import { FireToast } from '../../config/alerts';

const userReducer = ( state, action ) =>{
  
  const { type, payload } = action;
  switch ( type ) {
    case USER_LOGIN:
      return({
        ...state,
        loading : payload.loading
      });
    case USER_LOGIN_SUCESS:
      localStorage.setItem('got-it-token', payload.token);
      const { loading, token, message, isAuth, user } = payload
      //Alert
      FireToast( 'success',message )
      return({
        ...state,
        loading,
        token,
        message,
        isAuth, 
        user
      });
      
    case USER_LOGIN_ERROR: 
    case USER_ERROR: 
    //Alert
    localStorage.removeItem('got-it-token')
    FireToast( 'error',payload.message );
      return({
        ...state,
        loading : false, 
        message : payload.message,
        isAuth: payload.isAuth, 
      });
    case USER_AUTH:
      return ({
        ...state,
        isAuth : payload.isAuth,
        message : payload.message,
        user: payload.user,
        isAdmin: payload.isAdmin,
      }) ;
    case USER_LOGOUT: 
    localStorage.removeItem('got-it-token');
      return({
        ...state,
        user : null,
        token : null,
        message : null ,
        isAuth : null
      });
    default:
      return state;
  }
}
export default userReducer; 
