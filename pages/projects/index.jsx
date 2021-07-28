import React, { useEffect, useState } from 'react';
// components
import Layout from '../../components/layout'
// contexts
import useProjects from '../../context/hooks/useProjects';
// http
import { getProjects } from '../../config/axios/projects';
// material ui
import { Grid } from '@material-ui/core';
// components 
import TasksList from '../../components/tasks/TasksLists';
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
const Proyects = ({projects}) => {

  const projectsState = useProjects();
  const { setProjectsList } = projectsState;
  useEffect( async() => {
    await setProjectsList( projects )
    
  }, [])

  return(
    <Layout>
      <Grid container spacing = { 4 } className= { styles.page } >
        <Grid className = { styles.page__project__title} item xs= { 12 }> 
          <h1 >Project Name</h1>
        </Grid>
        <Grid item xs = { 8 } className = { styles.page__project__description }  >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eveniet at possimus recusandae est error hic repellat aliquam voluptate. Aliquam sint necessitatibus nulla! Eos facere placeat nemo, consequatur voluptate iste?  
          </p>
        </Grid>
        <Grid item xs = { 4 } className = { styles.page__project__info } >
          <p>info :</p>
          <p>info :</p>
          <p>info :</p>
        </Grid>
        <Grid item xs = { 12} className = { styles.page__project__lista } >
          <p> Lista de Tareas</p>
          <TasksList></TasksList>
        </Grid>
      </Grid>
    </Layout>
  );
}
 
export default Proyects;

