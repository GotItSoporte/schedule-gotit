import {
  TASKS_GET_TASKS,
  TASKS_SET_TASKS,
  TASKS_SET_CURRENT_TASK,
  TASKS_CREATE_REQUERIMENT,
  TASKS_ERROR
} from '../types';

const tasksReducer = ( state, action ) => {
  const { type, payload } = action;
  switch ( type ) {
    case TASKS_SET_TASKS:
    case TASKS_GET_TASKS:
      return({
        ...state,
        tasksList : payload,
      });
    case TASKS_SET_CURRENT_TASK:
      return({
        ...state,
        currentTask : payload
      });
    case TASKS_CREATE_REQUERIMENT:
      return({
        ...state,
        message : payload.message
      })
    case TASKS_ERROR:
      return ({
        ...state,
        error : payload
      })
    default:
      return state;
  }
}

export default tasksReducer;