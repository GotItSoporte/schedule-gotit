import React, { useEffect } from 'react';
// next
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
//material ui 
import { Grid } from '@material-ui/core';
//components
import ProjectList from '../ProjectList';
// context
import useUser from '../../context/hooks/useUser';
// styles
import styles from '../../styles/header.module.scss';
// images
import logo from '../../public/Gotit Horizontal.png'

const Header = () => {
  // User context 
  const userContext = useUser();
  const { state, logout } = userContext;
  // next routing 
  const router = useRouter();
  // useEffect
  useEffect( ()=>{
    if( !state.isAuth ){
      router.push( '/login' )
    }
  }, [ state ])

  const log_out = () =>{
    logout();
  }
  return (  
    <header className = { styles.header }>
            <div id={ styles.logo }>
                <Image id= { styles.Logo_GotIt  } src={ logo } />
            </div>
            <div id= { styles.Container }>
                <ul id={styles.menu}>
                  <li><a onClick ={ log_out } href="#">Cerrar Sesión</a></li>
                  <li><a href="#">Proyectos</a></li>
                </ul>
            </div>
    </header>
  );
}
 
export default Header;