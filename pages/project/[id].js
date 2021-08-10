import React, { useEffect, useState } from 'react';
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
  const showSstartDate = new Date(project.startDate)
  const hoursLeft = 0;
  const hoursUsed = 0;

  return ( 
    <>
      <Header /> 
      <section className ={ styles.section }>
          <h1>{ user?.company }</h1>
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
                      <td>{ project?.hoursLeft }</td><td>{ project.hoursTotal }</td>
                      <td>{ hoursUsed}</td>
                      <td>{ project?.hoursTotal }</td>
                      <td>{ showSstartDate.getFullYear() }</td>
                      <td>{ project?.finishDate || 'no definido' }</td>
                  </tr>
              </tbody>
              </table>
          </div>
      </section>
      { tasksState? <TasksList /> : <h2>No hay tareas para mostrar</h2>}
  </>
   );
}
 
export default Project;