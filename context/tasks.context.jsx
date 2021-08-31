import { createContext } from 'react';

export const initialstate = {
  tasksList : [],
  currentTask : null,
  loading : false
}

const Taskcontext = createContext( initialstate );

export default Taskcontext;