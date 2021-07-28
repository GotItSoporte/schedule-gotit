import React, { useState, useEffect } from 'react';
// contexts
import useProjects from '../context/hooks/useProjects';
//styles
import styles from '../styles/layout.module.scss';

const ProjectList = ({ children }) => {
  const projectsState = useProjects();
  const { projectsList } = projectsState;
  useEffect(() => {
     console.log('desde lista :', projectsList[1]?.name )
  }, [ projectsList ])
  
  return ( 
    <>
      {projectsList.map( (project , index)=> 
      <>
          <Project 
            key = { project._id }
            project = { project }
          />
      </>
      )}
    </>
  );
}

const Project = ({project})  =>{
  let name =project.name.length > 18 ? `${project.name.substring( 0, 20 )}...`: project.name;
  const seetCurrentProject =  id =>{
    console.log( `set project ${ id }` ) 
  }
  return  (
    <div className= { styles.sider__item }>
      <h4> { name }</h4>
      <button 
        className= { styles.sider__item__button }
        onClick = { () => seetCurrentProject( project._id ) }
      > ver </button>
    </div>
  )
}

export default ProjectList;
