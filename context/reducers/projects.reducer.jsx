import {
  PROJECTS_GET,
  PROJECTS_ERROR,
  PROJECTS_SET_CURRENT_PROJECT
} from '../types';

const projectsReducer = ( state, action ) => {
  const { type, payload } = action;
  switch ( type ) {
    case PROJECTS_GET:
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