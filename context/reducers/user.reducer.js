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
} from '../types';

const userReducer = ( state, action ) =>{
  console.log( action )
  const { type, payload } = action;
  switch ( type ) {
    case USER_LOGIN:
      return({
        ...state,
        loading : payload.loading
      });
    case USER_LOGIN_SUCESS:
      localStorage.setItem('got-it-token', payload.token);
      const { loading, token, message, isAuth } = payload
      return({
        ...state,
        loading,
        token,
        message,
        isAuth 
      });
    default:
      return state;
  }
}
export default userReducer; 
