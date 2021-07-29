import {
  TASKS_GET_TASK,
  TASKS_GET_TASKS,
  TASKS_SET_CURRENT_TASK,
  TASKS_ERROR
} from '../types';
// react hook
import { useReducer } from 'react';
// api calls
import { getTasksProject as getTasksProjectApi} from '../../config/axios/tasks';
import TaskContext , { initialstate } from '../tasks.context';
import tasksReducer from '../reducers/tasks.reducer';

const TasksWrapper =({ children }) =>{
  const [ state, dispatch ] = useReducer( tasksReducer, initialstate );
 
  // ******************************************
  // ********* get tasks from project *********
  // ******************************************
  const getTasksProject = async ( id ) => {
    console.log( id );
      try {
        const result = await getTasksProjectApi(id);
        return dispatch( {
          type: TASKS_GET_TASKS,
          payload: result
        } );
      } catch (error) {
        console.log( error );
        return dispatch({
          type: TASKS_ERROR,
          payload: error
        });
      }
  }
  return(
    <TaskContext.Provider value = { { 
        tasksList    : state.tasksList,
        currentTask    : state.currentTask,

        getTasksProject : getTasksProject
    }}>
      { children }
    </TaskContext.Provider>
  );
}

export default TasksWrapper;