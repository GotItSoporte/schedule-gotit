import {createContext} from 'react';

const initialstate = {
  user : null,
  token : null,
  isAdmin: false
}
export default createContext( initialstate );
