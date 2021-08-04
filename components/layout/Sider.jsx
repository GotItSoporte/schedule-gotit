import React from 'react';
// next
import Link from 'next/link';
//material ui 
import { Grid } from '@material-ui/core';
// styles
//components
import ProjectList from '../ProjectList';

const Sider = () => {
  return ( 
    <div >
      <h2 >Proyectos </h2>
      <ProjectList />
    </div>
  );
}
 
export default Sider;