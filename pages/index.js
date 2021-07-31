import { useEffect } from 'react';
// routing
import { useRouter } from 'next/router'; 
// context 
import useUser from '../context/hooks/useUser';
//import Head from 'next/head'
//import Image from 'next/image'
//components 
import Header from '../components/layout/Header';
import styles from '../styles/Home.module.scss';
import Layout from '../components/layout';
// material ui
import { Grid } from '@material-ui/core';

export default function Home() {
  // userContext
  const userState = useUser();
  const { state, isAuthenticated } = userState; 
  
  // userContext
  const router = useRouter();

  // useEffect
  useEffect( ()=>{
    if( !state.isAuth ){
      authentication();
    }
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
      <h1>Home</h1>
    </Grid>
  )
}
