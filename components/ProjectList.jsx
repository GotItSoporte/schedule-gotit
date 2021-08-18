import React, { useState, useEffect } from 'react';
// lin router
import { useRouter } from 'next/router';
import Link from 'next/link';
// compponets
import BtnsContainer from './layout/BtnsContainer';
// contexts
import useProjects from '../context/hooks/useProjects';
import useTasks from '../context/hooks/useTasks';
//styles
import styles from '../styles/pages.module.scss';

const ProjectList = ({ userRole }) => {
  // contexts 
  const projectsState = useProjects();
  const { projectsList, setCurrentProject } = projectsState;
  //
  const tasksState = useTasks();
  const { getTasksProject } = tasksState;
  useEffect(() => {
  }, [  ])
  
  return ( 
  
     <div id={ styles.TodoInicio }>
       <div id={ styles.TodoInicio2 }>
           <div id={ styles.Proyecto }>
            <section className = { styles.section }>
            <h1>{ userRole? 'PROYECTOS' : 'TUS PROYECTOS'}</h1>
              <div >
                  <table >
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            { userRole? <th>Cliente</th> : null}
                            <th>HORAS RESTANTES</th>
                            <th>HORAS USADAS</th>
                            <th>HORAS TOTALES</th>
                            <th>FECHA DE INICIO</th>
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
                            key = { index }
                            project = { project }
                            setCurrentProject = { setCurrentProject }
                            getTasksProject = { getTasksProject }
                            userRole = { userRole }
                          />
                      </>
                      )}
                    
                    </tbody>
                  </table>
              </div>
              </section>
           </div>
       </div>
     </div>

  );
}

const Project = ({ project, setCurrentProject, getTasksProject, userRole })  =>{
    // Router
    const router = useRouter();

  let name =project.name.length > 18 ? `${project.name.substring( 0, 20 )}...`: project.name;
  // calculate hours
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const showSstartDate = new Date(project.startDate)
  const hoursLeft = 0;
  const hoursUsed = 0;

  const linkProject =  id =>{
    setCurrentProject( project )
    getTasksProject( id );
    router.push( `/project/${ id }` )
  }

  let timeTotal = project?.time[ project?.currentMonth - 1 ].minutes;
  let timeUsed = project?.time[ project?.currentMonth - 1 ].minutesUsed;
  let timeLeft = (timeTotal - timeUsed) / 60 ;
  console.log({ timeTotal, timeUsed, timeLeft })
  timeTotal = timeTotal / 60;
  timeUsed = timeUsed / 60;
  return  (
    <tr>
      <td> { name }</td>
        { userRole? <td>{ project.company }</td> : null}
        <td>{ Math.floor(timeLeft)  }</td>
        <td>{ timeUsed }</td>
        <td>{ timeTotal }</td>
        <td>{ showSstartDate.toLocaleDateString( 'es-Es', dateOptions) }</td>
        <td>
          <BtnsContainer
            itemID = { project._id }
            seeFunc ={ linkProject }
            showEdit = { userRole}
            showDelete = { false }
          />
        </td>
    </tr>    
  )
}

export default ProjectList;
