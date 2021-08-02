import {
  TASKS_GET_TASKS,
  TASKS_SET_TASKS,
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
        //call the api
        const result = await scheduleApi.get(`/projects/${ id }/tasks`);
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
  // ******************************************
  // ********* Set Tasks to state **********
  // ******************************************
  const setTasksList = async ( tasks ) => {
    return dispatch( {
      type: TASKS_SET_TASKS,
      payload: tasks
    } );
  }
  // ******************************************
  // ****** Set Current ptoject to state ******
  // ******************************************
  const setCurrentTask = async ( task ) => {
    return dispatch( {
      type: TASKS_SET_CURRENT_TASK,
      payload: task
    } );
  }
  return(
    <TaskContext.Provider value = { { 
        state : state,
        getTasksProject : getTasksProject,
        setTasksList : setTasksList,
        setCurrentTask : setCurrentTask,
    }}>
      { children }
    </TaskContext.Provider>
  );
}

export default TasksWrapper;