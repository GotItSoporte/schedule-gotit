import { 
  PROJECTS_ERROR, 
  PROJECTS_GET,
  PROJECTS_SUCCES,
  PROJECTS_SET_CURRENT_PROJECT
} from '../types';
// react hook
import { useReducer } from 'react';
// api calls
import { scheduleApi } from '../../config/axios';
//
import { getTasksProject as getTasksProjectApi} from '../../config/axios/projects';
import ProjectContext , { initialstate } from '../projects.context';
import projectsReducer from '../reducers/projects.reducer';

const ProjectsWrapper =({ children }) =>{
  const [ state, dispatch ] = useReducer( projectsReducer, initialstate );
  // ******************************************
  // ********* Set ptojects to state **********
  // ******************************************
  const getProjectsList = async ( company ) => {
    dispatch( {
      type: PROJECTS_GET,
      payload: { loading: true }
    });
    try {
      const result = await scheduleApi.get(`/projects${ company? `?company=${ company }`: '' }`);
      return dispatch( {
        type: PROJECTS_SUCCES,
        payload: result.data.projects,
      } );
    } catch (error) {
      return dispatch( {
        type: PROJECTS_ERROR,
        payload: {
          message: error.response.data.message,
        },
      } );
      
    }
  }
  // ******************************************
  // ****** Set Current ptoject to state ******
  // ******************************************
  const setCurrentProject = async ( project ) => {
      return dispatch( {
        type: PROJECTS_SET_CURRENT_PROJECT,
        payload: project
      } );
  }
  return(
    <ProjectContext.Provider value = { { 
        projectsList    : state.projectsList,
        currentProject  : state.currentProject,
        getProjectsList : getProjectsList,
        setCurrentProject: setCurrentProject,
    }}>
      { children }
    </ProjectContext.Provider>
  );
}

export default ProjectsWrapper;