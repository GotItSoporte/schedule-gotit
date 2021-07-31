import {
  TASKS_GET_TASK,
  TASKS_GET_TASKS,
  TASKS_SET_CURRENT_TASK,
  TASKS_ERROR
} from '../types';

const tasksReducer = ( state, action ) => {
  const { type, payload } = action;
  switch ( type ) {
    case TASKS_GET_TASKS:
      return({
        ...state,
        tasksList : payload,
      });
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