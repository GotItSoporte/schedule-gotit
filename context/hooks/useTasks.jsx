import { useContext } from 'react';
import TasksProjects from '../tasks.context';

const hook = () => useContext( TasksProjects );
export default hook; 