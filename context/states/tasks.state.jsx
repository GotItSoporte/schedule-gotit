import {
  TASKS_GET_TASKS,
  TASKS_SET_TASKS,
  TASKS_SET_CURRENT_TASK,
  TASKS_CREATE_REQUERIMENT,
  TASKS_EDIT_REQUERIMENT,
  TASKS_SET_TASK_ACTIVE,
  TASKS_EDIT_ACTIVE_TASK,
  TASKS_ERROR,
  TASKS_GET_TASKS_SUCCESS
} from '../types';
// react hook
import { useReducer } from 'react';
// api calls
import { scheduleApi } from '../../config/axios';
import  setTokenAuth from '../../config/axios/auth';
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
      dispatch({
        type : TASKS_GET_TASKS,
        payload : {
          loading : true
        }
      })
      const result = await scheduleApi.get(`/projects/${ id }/tasks`);
        return dispatch( {
          type: TASKS_GET_TASKS_SUCCESS,
          payload: {
            tasks : result.data.tasks,
            loading : false
          }
        } );
      } catch (error) {
        return dispatch({
          type: TASKS_ERROR,
          payload: {
            error : error.response.data,
            loading : false
          }
        });
      }
  }
  // ******************************************
  // ****** Set Current task to state ******
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
      const token = localStorage.getItem('got-it-token');
      setTokenAuth( token );
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
      const token = localStorage.getItem('got-it-token');
      setTokenAuth( token );
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
    const token = localStorage.getItem('got-it-token');
    setTokenAuth( token );
   try {
    const result = await scheduleApi.put ( `/requirements/set-time/${ taskID }`, task );
    console.log( { result } )
    return dispatch({
      type : TASKS_SET_TASK_ACTIVE,
      payload : {
        currentTask : result.data.updatedTask,
        message : result.data.message,
      },
    })
  } catch (error) {
    const errorMessagge = error.response.data.errores?.
      reduce( ( acc, err )=> acc + `, ${ err.msg }` , 'Errores : ' ) 
      || error.response.data.message 
    console.log( { error : error.response.data.errores || error.response.data.message } )
    return dispatch({
      type: TASKS_ERROR,
      payload: errorMessagge,
    });
  } 
  
}
// ******************************************
// ***********  Edit Active task  ***********
// ******************************************
  const editActiveTask = async ( task, taskID ) => {
  const token = localStorage.getItem('got-it-token');
      setTokenAuth( token );
  try {
    const result = await scheduleApi.put ( `/tasks/update/${ taskID }`, task );
    console.log( { result } )
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