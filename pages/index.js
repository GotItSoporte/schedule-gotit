import { useEffect } from 'react';
// routing
import { useRouter } from 'next/router'; 
// context 
import useProjects from '../context/hooks/useProjects';
import useUser from '../context/hooks/useUser';
//components 
import Header from '../components/layout/Header';
import Layout from '../components/layout';
import ProjectList from '../components/ProjectList';
// api
import { scheduleApi } from '../config/axios';
// material ui
import { Grid } from '@material-ui/core';
// styles
import styles from '../styles/pages.module.scss';


// initial props
export async function getServerSideProps(context) {

  const { company } =context.query
  const result = await scheduleApi.get(`/projects${ company? `?company=${ company }`: '' }`);

  if( !result ){ 
    return{
      notFound: true,
    } 
  }

  //const projects = [error];
 return {
   props: {
     projects : result.data.projects
   }, // will be passed to the page component as props
 }
}

// page
export default function Home({ projects }) {
  // userContext
  const userState = useUser();
  const { state, isAuthenticated } = userState; 
  
  // Projects Contexts
  const projectContext = useProjects();
  const { setProjectsList, currentProject } = projectContext;

  // userContext
  const router = useRouter();

  // useEffect
  useEffect( ()=>{
    setProjectsList( projects )
  }, [ ])

  const authentication = async () => {
    await isAuthenticated();
    if( !state.isAuth ){
      router.push( '/login' )
    }
  }
  return(
    <Grid>
      <Header/>
       <ProjectList/>
    </Grid>
  )
}
