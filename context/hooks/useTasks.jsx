import { useContext } from 'react';
import TasksContext from '../tasks.context';

const hook = () => useContext( TasksContext );
export default hook; 