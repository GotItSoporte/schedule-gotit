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
// Sweet Aert
import { FireToast } from '../../config/alerts';

const tasksReducer = ( state, action ) => {
  const { type, payload } = action;
  switch ( type ) {
    case TASKS_GET_TASKS:
      console.log('get Tasks', { payload })
      return({
        ...state,
        loading : payload.loading
      });
      case TASKS_SET_TASKS:
      case TASKS_GET_TASKS_SUCCESS:
      console.log('Get tasks success', { payload })
      return({
        ...state,
        tasksList : payload.tasks,
        loading : payload.loading
      });
    case TASKS_SET_CURRENT_TASK:
      return({
        ...state,
        currentTask : payload
      });
    case TASKS_SET_TASK_ACTIVE:
    case TASKS_EDIT_ACTIVE_TASK:
    case TASKS_CREATE_REQUERIMENT:
    case TASKS_EDIT_REQUERIMENT:
      // Alert
      FireToast( 'success', payload.message )
      return({
        ...state,
        message : payload.message,
        currentTask : payload.currentTask
      });
      case TASKS_ERROR:
      // Alert
      FireToast( 'error', payload )
      return ({
        ...state,
        error : payload.error, 
        loading : payload.loading,
      })
    default:
      return state;
  }
}

export default tasksReducer;