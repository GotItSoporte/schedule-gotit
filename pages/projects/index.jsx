import React, { useEffect, useState } from 'react';
// components
import Layout from '../../components/layout'
// contexts
import useProjects from '../../context/hooks/useProjects';
// http
import { getProjects } from '../../config/axios/projects';
// material ui
import { Grid } from '@material-ui/core';
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
      <Grid container className= { styles.page } >
        <Grid className = { styles.page__project__title} item xs= { 12 }> 
          <h1 >Project Name</h1>
        </Grid>
        <Grid >

        </Grid>
      </Grid>
    </Layout>
  );
}
 
export default Proyects;

