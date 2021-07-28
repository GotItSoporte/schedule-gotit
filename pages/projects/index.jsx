import React, { useEffect } from 'react';
// components
import Layout from '../../components/layout'
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
  console.log( projects )
  return(
    <Layout>
      <div><h2>Proyects</h2></div>
    </Layout>
  );
}
 
export default Proyects;

