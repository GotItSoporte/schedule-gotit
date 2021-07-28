import {
  PROJECTS_SET,
  PROJECTS_ERROR
} from '../types';

const projectsReducer = ( state, action ) => {
  const { type, payload } = action;
  switch ( type ) {
    case PROJECTS_SET:
      return({
        ...state,
        projectsList : payload,
      })
    default:
      return state;
  }
}

export default projectsReducer;