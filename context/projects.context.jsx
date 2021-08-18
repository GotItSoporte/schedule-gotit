import { createContext } from 'react';

export const initialstate = {
  projectsList : [],
  currentProject : null,
  loading : false,
}

const ProjectContext = createContext( initialstate );

export default ProjectContext;