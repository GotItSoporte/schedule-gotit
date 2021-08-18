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


// page
export default function Home() {
  // userContext
  const userContext = useUser();
  const { state: userState, isAuthenticated } = userContext; 
  const { isAuth, token, user } = userState;
  // Projects Contexts
  const projectContext = useProjects();
  const { getProjectsList, currentProject } = projectContext;

  // userContext
  const router = useRouter();

  // useEffect
  useEffect( ()=>{
    if( !isAuth ){
      authentication();
    }
    getProjects( user );
  }, [ isAuth ])
  
  const authentication = async () => {
    await isAuthenticated();
    if( !isAuth ){
      router.push( '/login' )
    }
  }

  const getProjects = async user => {

    if( user?.role ){
      await getProjectsList(  );

    }else{
      await getProjectsList( user?.company )
    }

  }


  return(
    <Grid>
    { isAuth? 
      <>
        <Header/>
        { user?.company? <ProjectList userRole = { user?.role } /> : <Spinner/> } 
      </>
      : <Spinner/>
    }
    </Grid>
  )
}
