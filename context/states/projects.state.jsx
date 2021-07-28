import { 
  PROJECTS_ERROR, 
  PROJECTS_SET 
} from '../types';
// react hook
import { useReducer } from 'react';
// api calls
import { getProjects } from '../../config/axios/projects';
import ProjectContext , { initialstate } from '../projects.context';
import projectsReducer from '../reducers/projects.reducer';

const ProjectsWrapper =({ children }) =>{
  const [ state, dispatch ] = useReducer( projectsReducer, initialstate );
  const setProjectsList = async ( projects ) => {
      return dispatch( {
        type: PROJECTS_SET,
        payload: projects
      } );
  }

  return(
    <ProjectContext.Provider value = { { 
        projectsList : state.projectsList ,
        setProjectsList : setProjectsList,
    }}>
      { children }
    </ProjectContext.Provider>
  );
}

export default ProjectsWrapper;