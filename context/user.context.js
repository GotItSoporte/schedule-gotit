import {createContext} from 'react';

export const initialstate = {
  user : null,
  loading : false,
  token :  typeof window !== 'undefined'? localStorage .getItem( 'got-it-token' ) : null,
  isAdmin: false,
  isAuth : false,
  error : false
}
export default createContext( initialstate );
