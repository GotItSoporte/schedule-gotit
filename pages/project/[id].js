import React, { useEffect, useState } from 'react';
// components
import Layout from '../../components/layout'
import Header from '../../components/layout/Header'
// contexts
import useProjects from '../../context/hooks/useProjects';
import useTasks from '../../context/hooks/useTasks';
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
  
  // Projects Tasklist
  const tasksContext = useTasks();
  const { state :tasksState , setTasksList } = tasksContext;
  
  useEffect( async () => {
    await setTasksList( tasks );
    console.log( tasksState )
    console.log( currentProject )
  }, [ tasks ]);
  
  return ( 
    <>
      <Header /> 
      <div>
        <h1>{ notFound? "NOT FOUND" :'Pagina Proyecto'}</h1>
        <h1>{ !project? "NOT FOUND" : project._id}</h1>
      </div>
      <section className ={ styles.section }>
          <h1>{ project?.name || 'No Encontrado' }</h1>
          <div className={ styles.tbl_header }>
              <table >
              <thead>
                  <tr>
                      <th>MESES</th>
                      <th>HORAS TOTALES</th>
                      <th>HORAS RESTANTES</th>
                      <th>FECHA DE INICIO</th>
                      <th>FECHA DE FINALIZACIÓN</th>
                  </tr>
              </thead>
              </table>
          </div>
          <div className ={ styles.tbl_content }>
              <table >
              <tbody>
                  <tr>
                      <td>meses</td>
                      <td>{ project?.hoursTotal }</td>
                      <td>{ project?.hoursLeft }</td>
                      <td>{ project?.startDate }</td>
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