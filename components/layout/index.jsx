import React from 'react';
// material ui
import { Grid } from '@material-ui/core';
//styles
import styles from '../../styles/layout.module.scss';
// components
import Header from './Header';
import Sider from './Sider';

const Layaout = ({ children }) => {
  return ( 
    <>
      <Header/>
      { children }
    </>

  );
}
 
export default Layaout;