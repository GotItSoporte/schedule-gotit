import React, { useState, useEffect } from 'react';
// contexts
import useProjects from '../context/hooks/useProjects';
import useTasks from '../context/hooks/useTasks';
//styles
import styles from '../styles/layout.module.scss';

const ProjectList = ({ children }) => {
  // contexts 
  const projectsState = useProjects();
  const { projectsList, setCurrentProject } = projectsState;
  const tasksState = useTasks();
  const { getTasksProject } = tasksState;
  useEffect(() => {
  }, [ projectsList ])
  
  return ( 
    <>
      {projectsList.map( (project , index)=> 
      <>
          <Project 
            key = { project._id }
            project = { project }
            setCurrentProject = { setCurrentProject }
            getTasksProject = { getTasksProject }
          />
      </>
      )}
    </>
  );
}

const Project = ({ project, setCurrentProject, getTasksProject })  =>{
  let name =project.name.length > 18 ? `${project.name.substring( 0, 20 )}...`: project.name;
  const setProject =  id =>{
    console.log({ project : id})
    setCurrentProject( project )
    getTasksProject( id );
  }
  return  (
    <div className= { styles.sider__item }>
      <h4> { name }</h4>
      <button 
        className= { styles.sider__item__button }
        onClick = { () => setProject( project._id ) }
      > ver </button>
    </div>
  )
}

export default ProjectList;
