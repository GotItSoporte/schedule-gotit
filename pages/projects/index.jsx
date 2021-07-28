import React, { useEffect, useState } from 'react';
// components
import Layout from '../../components/layout'
// contexts
import useProjects from '../../context/hooks/useProjects';
// http
import { getProjects } from '../../config/axios/projects'
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
      <div><h2>Proyects</h2></div>
    </Layout>
  );
}
 
export default Proyects;

