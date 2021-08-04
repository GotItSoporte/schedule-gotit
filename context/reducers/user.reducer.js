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
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

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
      console.log( 'REDUCER',{state}, { payload } )

      //Alert
      Toast.fire({
        icon: 'success',
        title: message
      });
      return({
        ...state,
        loading,
        token,
        message,
        isAuth, 
        user
      });
      
    case USER_LOGIN_ERROR: 
    //Alert
    Toast.fire({
      icon: 'error',
      title: payload.message
    });

    console.log( 'error', payload.message )
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
        isAdmin: payload.isAdmin
      }) ;
    case USER_LOGOUT: 
    localStorage.setItem('got-it-token', null);
      return({
        ...state,
        token : null,
        message : null ,
        isAuth : null
      });
    default:
      return state;
  }
}
export default userReducer; 
