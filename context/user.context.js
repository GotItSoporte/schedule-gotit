import {createContext} from 'react';

export const initialstate = {
  user : null,
  token :  typeof window !== 'undefined'? localStorage .getItem( 'got-it-token' ) : null,
  isAdmin: false,
  isAuth : false
}
export default createContext( initialstate );
