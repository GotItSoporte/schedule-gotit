import { createContext } from 'react';

export const initialstate = {
  tasksList : [],
  currentTask : null,
}

const Taskcontext = createContext( initialstate );

export default Taskcontext;