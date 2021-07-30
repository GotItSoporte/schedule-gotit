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
// react
import { useReducer } from 'react';
// sustom hook
import useUser from '../hooks/useUser';
// api calls
import { getTasksProject as getTasksProjectApi} from '../../config/axios/tasks';
//context
import UserContext , { initialstate } from '../user.context';
// reducer 
import userReducer from '../reducers/user.reducer';

const UserWrapper = ({ children }) =>{
  const [ state, dispatch ] = useReducer( userReducer, initialstate );
  return( 
    <UserContext.Provider value = {{
      state = state,
    }}>
      {children}
    </UserContext.Provider>
  );
}
