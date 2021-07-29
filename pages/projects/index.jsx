import React, { useEffect, useState } from 'react';
// components
import Layout from '../../components/layout'
// contexts
import useProjects from '../../context/hooks/useProjects';
import useTasks from '../../context/hooks/useTasks';
// http
import { getProjects } from '../../config/axios/projects';
// material ui
import { Grid } from '@material-ui/core';
// components 
import TasksList from '../../components/tasks/TasksList';
// styles 
import styles from '../../styles/projects.module.scss';

// initial props
export async function getServerSideProps(context) {
 
  const projects = await getProjects()
  if( !projects ){ 
    return{
      notFound: true,
    } 
  }
  return {
    props: {
      projects
    }, // will be passed to the page component as props
  }
}
// Page
const Projects = ({projects}) => {
  // Cntexts
  const projectsState = useProjects();
  const { setProjectsList, currentProject } = projectsState;

  const tasksState = useTasks();
  const { tasksList } = tasksState;
  useEffect( async() => {
    await setProjectsList( projects )
  }, [tasksList])

  return(
    <Layout>
      <Grid container spacing = { 4 } className= { styles.page } >
        <Grid className = { styles.page__project__title} item xs= { 12 }> 
          <h1 >Project Name : { currentProject?.name  } </h1>
        </Grid>
        
        <Grid item xs = { 8 } className = { styles.page__project__description }  >
          <p>
            { currentProject?.description || 'Este Proyecto no tiene descripcion' }
          </p>
        </Grid>
        <Grid item xs = { 4 } className = { styles.page__project__info } >
          <p>Horas Totales : { currentProject?.hoursTotal }</p>
          <p>Horas Restantes : { currentProject?.hoursLeft }</p>
          <p>Fecha de inicio : { currentProject?.startDate }</p>
          <p> # de Tareas : { currentProject?.tasks.length }</p>
        </Grid>
        <Grid item xs = { 12 } className = { styles.page__project__lista } >
          <TasksList tasksList = {tasksList}/>
        </Grid>
      </Grid>
    </Layout>
  );
}
 
export default Projects;

