import React, { useEffect, useState } from 'react';
// 
import { useRouter } from 'next/router';
// components
import Layout from '../../components/layout'
import Header from '../../components/layout/Header'
// contexts
import useProjects from '../../context/hooks/useProjects';
import useTasks from '../../context/hooks/useTasks';
import useUser from '../../context/hooks/useUser';
// http
import { scheduleApi } from '../../config/axios';
import { getProjects } from '../../config/axios/projects';
// material ui
import { Grid } from '@material-ui/core';
// components 
import TasksList from '../../components/tasks/TasksList';
// styles 
import styles from '../../styles/pages.module.scss';
// initial props
export async function getServerSideProps(context) {
  const { id } = context.params;
    let project =  null;
    let tasks =  null;
    let message = null;
    let notFound= true; 
  try {
    let result = await scheduleApi.get( `/projects/${id}` );
    project = result.data.project
    result = await scheduleApi.get( `/projects/${id}/tasks` );
    tasks = result.data.tasks;
    message = 'llamado a api exitoso';
    notFound = false
  } catch (error) {
      message = 'Hubo un error al obtener el proyecyo';
      notFound = true;
  }
  return {
    props:{
      project,
      tasks,
      message,
      notFound
    } , // will be passed to the page component as props
  }
 }

const Project = ({ notFound, project, message, tasks }) => {
  // Routes
   // next routing 
   const router = useRouter();

  // Projects Contexts
  const projectContext = useProjects();
  const { setProjectsList, currentProject } = projectContext;
  
  // Tasks Context
  const tasksContext = useTasks();
  const { state :tasksState , setTasksList } = tasksContext;

  // Users Contexts
  const userContext = useUser();
  const { state :userState  } = userContext;
  const { user, isAuth } =userState;
  
  
  useEffect( async () => {
    if( !isAuth ){
      authentication();
    }
     await setTasksList( tasks );

  }, [ tasks ]);
  
  //
  const authentication = async () => {
    
    await getProjectsList( company );
  }

  // calculate hours
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const startDate = new Date( project?.startDate ).toLocaleDateString( 'es-ES', dateOptions)
  const finishDate = project?.finishDate? new Date( project?.finishDate ).toLocaleDateString( 'es-ES', dateOptions)
         : 'No asignada';
  let timeTotal = project?.time[ project?.currentMonth - 1 ].minutes;
  let timeUsed = project?.time[ project?.currentMonth - 1 ].minutesUsed;
  let timeLeft = (timeTotal - timeUsed) / 60 ;
  timeTotal = timeTotal / 60;

  return ( 
    <>
      <Header /> 
      <div id={ styles.TodoInicio }>
      </div>
        <div id={ styles.TodoInicio2 }>
          <section className ={ styles.section }>
              { user?.role? <h1>{ user?.company }</h1> : null }
              <h1>{ project?.name || 'No Encontrado' }</h1>
              <div className={ styles.tbl_header }>
                  <table >
                  <thead>
                      <tr>
                          <th>MESES</th>
                          <th>HORAS RESTANTES</th>
                          <th>HORAS USADAS</th>
                          <th>HORAS TOTALES</th>
                          <th>FECHA DE INICIO</th>
                          <th>FECHA DE Finalizacion</th>
                      </tr>
                  </thead>
                  </table>
              </div>
              <div className ={ styles.tbl_content }>
                  <table >
                  <tbody>
                      <tr>
                          <td>{ project.months }</td>
                          <td>{ Math.floor(timeLeft)  }</td>
                          <td>{ timeUsed }</td>
                          <td>{ timeTotal }</td>
                          <td>{ startDate }</td>
                          <td>{ finishDate }</td>
                      </tr>
                  </tbody>
                  </table>
              </div>
            { tasksState? <TasksList /> : <h2>No hay tareas para mostrar</h2>}
            { !user.role?
              <button 
                type="button" 
                className={ styles.NuevoRequerimiento }
                onClick = { () => router.push( {
                  pathname : '/new-req',
                  query :{ company : user?.company }
                } )}
              >Agregar Requerimiento </button>
              : null
            }
          </section>
        </div>
           <div id={ styles.Proyecto }>
           </div>
  </>
   );
}
 
export default Project;