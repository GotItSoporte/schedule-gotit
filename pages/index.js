import { useEffect } from 'react';
// routing
import { useRouter } from 'next/router'; 
// context 
import useProjects from '../context/hooks/useProjects';
import useUser from '../context/hooks/useUser';
//components 
import Header from '../components/layout/Header';
import ProjectList from '../components/ProjectList';
import Spinner from '../components/Spinner';
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
  const userContext = useUser();
  const { state: userState, isAuthenticated } = userContext; 
  const { isAuth, company } = userState;
  // Projects Contexts
  const projectContext = useProjects();
  const { getProjectsList, currentProject, } = projectContext;

  // userContext
  const router = useRouter();

  // useEffect
  useEffect( ()=>{
    if( !isAuth ){
      authentication();
    }
  }, [ isAuth ])
  
  const authentication = async () => {
    await isAuthenticated();
    console.log('redirect?',{ isAuth })
    if( !isAuth ){
      console.log('redirect')
      router.push( '/login' )
    }
    await getProjectsList( company );
  }
  return(
    <Grid>
    { isAuth? 
      <>
        <Header/>
        <ProjectList/> 
      </>
      : <Spinner/>
    }
    </Grid>
  )
}
