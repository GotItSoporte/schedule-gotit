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

  // userContext
  const router = useRouter();

  // useEffect
  useEffect( ()=>{
    if( !isAuth ){
      authentication();
    }
    getProjects( user );
  }, [ ])
  
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
