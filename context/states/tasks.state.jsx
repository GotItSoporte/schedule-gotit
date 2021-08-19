import {
  TASKS_GET_TASKS,
  TASKS_SET_TASKS,
  TASKS_SET_CURRENT_TASK,
  TASKS_CREATE_REQUERIMENT,
  TASKS_EDIT_REQUERIMENT,
  TASKS_SET_TASK_ACTIVE,
  TASKS_EDIT_ACTIVE_TASK,
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
  // ******************************************
  // ********* Create new Requeriment *********
  // ******************************************
  const createRequirement = async ( task ) => {
    try {
      const result = await scheduleApi.post( '/requirements', task );
      return dispatch({
        type: TASKS_CREATE_REQUERIMENT,
        payload :{
          currentTask : result.task,
          message : result.data.message,
        } 
      })
    } catch (error) {
        return dispatch({
          type: TASKS_ERROR,
          payload: error.response.data.message
        });
    }
  }
  // ******************************************
  // ************  Edit Requeriment  ***********
  // ******************************************
  const editRequirement = async ( task, taskID ) => {
    try {
      const result = await scheduleApi.put( `/requirements/${ taskID }`, task );
      return dispatch({
        type: TASKS_EDIT_REQUERIMENT,
        payload :{
          currentTask : result.data.updatedTask,
          message : result.data.message,
        } 
      })
    } catch (error) {
        return dispatch({
          type: TASKS_ERROR,
          payload: error.response.data.message
        });
    }
  }


  // ******************************************
  // ****** Set Requirement As Active *********
  // ******************************************
  const setReqAsTask = async ( task, taskID ) => {
   try {
    const result = await scheduleApi.put ( `/requeriments/set-time/${ taskID }`, task );
      return dispatch({
        type : TASKS_SET_TASK_ACTIVE,
        payload : {
          currentTask : result.data.updatedTask,
          message : result.data.message,
        },
    })
   } catch (error) {
    return dispatch({
      type: TASKS_ERROR,
      payload: error.response.data.message
    });
   } 
  
  }
  // ******************************************
  // ***********  Edit Active task  ***********
  // ******************************************
  const editActiveTask = async ( task, taskID ) => {
   try {
    const result = await scheduleApi.put ( `/requeriments/set-time/${ taskID }`, task );
      return dispatch({
        type : TASKS_EDIT_ACTIVE_TASK,
        payload : {
          currentTask : result.data.updatedTask,
          message : result.data.message,
        },
    })
   } catch (error) {
    return dispatch({
      type: TASKS_ERROR,
      payload: error.response.data.message
    });
   } 
  }

  return(
    <TaskContext.Provider value = { { 
        state : state,
        getTasksProject : getTasksProject,
        setTasksList : setTasksList,
        setCurrentTask : setCurrentTask,
        createRequirement : createRequirement,
        editRequirement : editRequirement,
        setReqAsTask : setReqAsTask,
        editActiveTask : editActiveTask,
    }}>
      { children }
    </TaskContext.Provider>
  );
}

export default TasksWrapper;