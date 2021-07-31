import {
  TASKS_GET_TASK,
  TASKS_GET_TASKS,
  TASKS_SET_CURRENT_TASK,
  TASKS_ERROR
} from '../types';
// react hook
import { useReducer } from 'react';
// api calls
import { scheduleApi } from '../../config/axios';
//context
import TaskContext , { initialstate } from '../tasks.context';
//reducer
import tasksReducer from '../reducers/tasks.reducer';

const TasksWrapper =({ children }) =>{
  const [ state, dispatch ] = useReducer( tasksReducer, initialstate );
 
  // ******************************************
  // ********* get tasks from project *********
  // ******************************************
  const getTasksProject = async ( id ) => {
    try {
        console.log('on getTasksProject' );
        //call the api
        const result = await scheduleApi.get(`/projects/${ id }/tasks`);
        console.log('on getTasksProject', result );
        return dispatch( {
          type: TASKS_GET_TASKS,
          payload: result.data.tasks
        } );
      } catch (error) {
        console.log( {error : error.response.data } );
        return dispatch({
          type: TASKS_ERROR,
          payload: error.response.data
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