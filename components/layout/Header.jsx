import React from 'react';
//import Image from 'next/image'
// next
import Link from 'next/link';
//material ui 
import { Grid } from '@material-ui/core';
// styles
import styles from '../../styles/layout.module.scss';

const Header = () => {
  return (  
    <header className = { styles.header}>
      <Grid container>
        <Grid item xs= {6}> 
          <Link href = '/'>
            <h1>Got It</h1>
          </Link>
        </Grid>
        <Grid item xs= {6}> </Grid>
      </Grid>
    </header>
  );
}
 
export default Header;