import React from 'react';
// material ui
import { Grid } from '@material-ui/core';
//styles
// components
import Header from './Header';

const Layaout = ({ children }) => {
  return ( 
    <>
      <Header/>
      { children }
    </>

  );
}
 
export default Layaout;