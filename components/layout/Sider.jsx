import React from 'react';
// next
import Link from 'next/link';
//material ui 
import { Grid } from '@material-ui/core';
// styles
import styles from '../../styles/layout.module.scss';
//components
import ProjectList from '../ProjectList';

const Sider = () => {
  return ( 
    <div className = { styles.sider } >
      <h2 className= { styles.sider__title}>Proyectos </h2>
      <ProjectList />
    </div>
  );
}
 
export default Sider;