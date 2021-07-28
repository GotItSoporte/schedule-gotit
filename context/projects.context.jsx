import { createContext } from 'react';

export const initialstate = {
  projectsList : [],
  currentProject : null,
}

const ProjectContext = createContext( initialstate );

export default ProjectContext;