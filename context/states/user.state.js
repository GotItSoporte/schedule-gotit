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
  USER_LOGOUT  
} from '../types';
// react
import { useReducer } from 'react';
// api calls
import { scheduleApi } from '../../config/axios';
import  setTokenAuth from '../../config/axios/auth';
//context
import UserContext , { initialstate } from '../user.context';
// reducer 
import userReducer from '../reducers/user.reducer';
// jwt
import jwt_decode  from 'jwt-decode';

const UserWrapper = ({ children }) =>{
  const [ state, dispatch ] = useReducer( userReducer, initialstate );
  // *****************************************
  // **************  User Login  *************
  // *****************************************
  const userLogin = async ( data ) =>{
    try {
      dispatch({
        type : USER_LOGIN,
        payload: {
          loading:true,
        }
      });
      const result = await scheduleApi.post('/users/login', data );// decode token
      const decodedToken = jwt_decode( result.data.accessToken );
      const { id, name, role, company, isAdmin } = decodedToken;
      return dispatch({
        type : USER_LOGIN_SUCESS,
        payload: {
          loading:false,
          token : result.data.accessToken,
          message : result.data.message,
          isAuth : true,
          user : { id, name, role, company },
          isAdmin,
        }
      });
    } catch (error) {
      console.log( 'errro', error.response.data.message )
      return dispatch({
        type : USER_LOGIN_ERROR,
        payload: {
          loading:false,
          isAuth:false,
          message : error.response.data.message,
        }
      });
    }
  }

  // *****************************************
  // **************  User Auth  *************
  // *****************************************
  const isAuthenticated = async()=>{
    // get token from localstorage
    const token = localStorage.getItem('got-it-token');
    if(  !token ){
      console.log( 'no token' );
      return dispatch({
        type : USER_ERROR,
        payload: {
          loading:false,
          isAuth: false,
          authError:true,
          message : 'Usuario no autenticado',
        }
      });
    }
    // set token as Athorization header
    setTokenAuth( token );
    try {
      // decode token
      const decodedToken = jwt_decode( token );
      console.log({ decodedToken })
      const { id, name, role, company, isAdmin, cellphone, email } = decodedToken;
      return dispatch({
        type : USER_AUTH, 
        payload: {
          isAuth : true,
          message :"Usuario Autenticado",
          user :{ id, name, role, company, cellphone, email },
          isAdmin
        }
      });
    } catch (error) {
      return dispatch({
        type : USER_ERROR,
        payload: {
          loading:false,
          isAuth : false,
          message : error,
        }
      });
    }
  } 

  // *****************************************
  // **************  Log out  ****************
  // *****************************************
  const logout = async()=>{
    dispatch({
      type : USER_LOGOUT
    });
  }

  return( 
    <UserContext.Provider value = {{
      state : state,
      userLogin : userLogin,
      isAuthenticated : isAuthenticated,
      logout : logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserWrapper;