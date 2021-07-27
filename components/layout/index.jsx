import React from 'react';
// material ui
import { Grid } from '@material-ui/core';
// components
import Header from './Header';
import Sider from './Sider';

const Layaout = ({ children }) => {
  return ( 
    <>
      <Header/>
      <Grid container>
        <Grid item xs ={ 4 }>
          <Sider/>
        </Grid>
        <Grid item xs ={ 8 }>
          { children}
        </Grid>
      </Grid>
    </>
   );
}
 
export default Layaout;