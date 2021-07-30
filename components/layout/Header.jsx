import React from 'react';
//import Image from 'next/image'
// next
import Link from 'next/link';
import Image from 'next/image';
//material ui 
import { Grid } from '@material-ui/core';
//components
import ProjectList from '../ProjectList';
// styles
import styles from '../../styles/header.module.scss';
// images
import logo from '../../public/Gotit Horizontal.png'

const Header = () => {
  return (  
    <header className = { styles.header }>
            <div id={ styles.logo }>
                <Image id= { styles.Logo_GotIt  } src={ logo } />
            </div>
            <div id= { styles.Container }>
                <ul id={styles.menu}>
                  <li><a href="#">Cerrar Sesión</a></li>
                  <li><a href="#">Proyectos</a></li>
                </ul>
            </div>
    </header>
  );
}
 
export default Header;