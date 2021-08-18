import {
  PROJECTS_GET,
  PROJECTS_ERROR,
  PROJECTS_SUCCES,
  PROJECTS_SET_CURRENT_PROJECT
} from '../types';

const projectsReducer = ( state, action ) => {
  const { type, payload } = action;
  switch ( type ) {
    case PROJECTS_GET:
      return({
        ...state,
        loading : payload.loading,
      })
    case PROJECTS_SUCCES:
      return({
        ...state,
        projectsList : payload,
        loading: false
      })
    case PROJECTS_SET_CURRENT_PROJECT:
      return({
        ...state,
        currentProject : payload,
        loading: false
      })
    default:
      return state;
  }
}

export default projectsReducer;