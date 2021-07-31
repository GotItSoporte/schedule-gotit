import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// contexts
import useProjects from '../context/hooks/useProjects';
import useTasks from '../context/hooks/useTasks';
//styles
import styles from '../styles/pages.module.scss';

const ProjectList = () => {
  // contexts 
  const projectsState = useProjects();
  const { projectsList, setCurrentProject } = projectsState;
  const tasksState = useTasks();
  const { getTasksProject } = tasksState;
  useEffect(() => {
    console.log( 'list', projectsList )
  }, [ projectsList ])
  
  return ( 
    <>
      <section className = { styles.section }>
        <h1>TUS PROYECTOS</h1>
        <div className={ styles.tbl_header }>
            <table >
              <thead>
                  <tr>
                      <th>NOMBRE</th>
                      <th>HORAS RESTANTES</th>
                      <th></th>
                  </tr>
              </thead>
            </table>
        </div>
        <div className={ styles.tbl_content }>
            <table >
              <tbody>
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
               
              </tbody>
            </table>
        </div>
        </section>
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
    <tr>
        <td> { name }</td>
        <td>{ project.hoursTotal }</td>
        <td><Link href= { `project/${project._id}` } >
          <a>Ver mas</a>
        </Link></td>
    </tr>    
  
  )
}

export default ProjectList;
