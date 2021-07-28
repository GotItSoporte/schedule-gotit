import { 
  PROJECTS_ERROR, 
  PROJECTS_SET,
  PROJECTS_GET_TASKS,
  PROJECTS_SET_CURRENT_PROJECT
} from '../types';
// react hook
import { useReducer } from 'react';
// api calls
import { getTasksProject as getTasksProjectApi} from '../../config/axios/projects';
import ProjectContext , { initialstate } from '../projects.context';
import projectsReducer from '../reducers/projects.reducer';

const ProjectsWrapper =({ children }) =>{
  const [ state, dispatch ] = useReducer( projectsReducer, initialstate );
  // ******************************************
  // ********* Set ptojects to state **********
  // ******************************************
  const setProjectsList = async ( projects ) => {
      return dispatch( {
        type: PROJECTS_SET,
        payload: projects
      } );
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
        setProjectsList : setProjectsList,
        setCurrentProject: setCurrentProject,
    }}>
      { children }
    </ProjectContext.Provider>
  );
}

export default ProjectsWrapper;