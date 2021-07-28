import {
  PROJECTS_SET,
  PROJECTS_ERROR,
  PROJECTS_GET_TASKS, 
  PROJECTS_SET_CURRENT_PROJECT
} from '../types';

const projectsReducer = ( state, action ) => {
  const { type, payload } = action;
  switch ( type ) {
    case PROJECTS_SET:
      return({
        ...state,
        projectsList : payload,
      })
    case PROJECTS_SET_CURRENT_PROJECT:
      return({
        ...state,
        currentProject : payload,
      })
    default:
      return state;
  }
}

export default projectsReducer;