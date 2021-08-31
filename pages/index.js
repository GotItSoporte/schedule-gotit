import { useEffect } from 'react';
// routing
import { useRouter } from 'next/router'; 
// context 
import useProjects from '../context/hooks/useProjects';
import useTasks from '../context/hooks/useTasks'
import useUser from '../context/hooks/useUser';
//components 
import Header from '../components/layout/Header';
import ProjectList from '../components/ProjectList';
import Spinner from '../components/Spinner';
// material ui
import { Grid } from '@material-ui/core';
// styles

// page
export default function Home() {
  // userContext
  const userContext = useUser();
  const { state: userState, isAuthenticated } = userContext; 
  const { isAuth, user } = userState;
  // Projects Contexts
  const projectContext = useProjects();
  const { getProjectsList } = projectContext;
  
  // Task  Contexts
  const taskContext = useTasks();
  const { state : taskState } = taskContext;
  const { loading : taskLoading} = taskState;
  // userContext
  const router = useRouter();

  // useEffect
  useEffect( ()=>{
    if( !isAuth ){
      authentication();
    }
    getProjects( user );
  }, [ ])
  
  useEffect(() => {
    console.log({ taskLoading });
  }, [ taskLoading ])
  
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
        { taskLoading? <Spinner/> : null } 
        <ProjectList userRole = { user?.role } />
      </>
      : <Spinner/>
    }
    </Grid>
  )
}
