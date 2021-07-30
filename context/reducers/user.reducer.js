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
  const { type, payload } = action;
  switch ( type ) {
  
    default:
      return state;
  }
}
export default userReducer; 
