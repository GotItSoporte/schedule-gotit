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
      const result = await scheduleApi.post('/users/login', data );
      return dispatch({
        type : USER_LOGIN_SUCESS,
        payload: {
          loading:false,
          token : result.data.accessToken,
          message : result.data.message,
          isAuth : true
        }
      });
    } catch (error) {
      return dispatch({
        type : USER_LOGIN_ERROR,
        payload: {
          loading:false,
          authError:true,
          message : error.response.data.message,
        }
      });
    }
  }

  // *****************************************
  // **************  User Auth  *************
  // *****************************************
  const isAuth = async()=>{
    // get token from localstorage
    const token = localStorage.getItem('got-it-token');
    // set token as Athorization header
    setTokenAuth( token );
    try {
      const resul = await scheduleApi.get('/users/auth');
      return dispatch({
        action : USER_AUTH, 
        payload: {
          isAuth : result.data.auth,
          message : result.data.message
        }
      });
    } catch (error) {
      return dispatch({
        type : USER_LOGIN_ERROR,
        payload: {
          loading:false,
          authError:true,
          message : error.response.data.message,
        }
      })
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
      isAuth : isAuth,
      logout : logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserWrapper;