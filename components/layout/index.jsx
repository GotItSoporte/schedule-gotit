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
    <div className = { styles.layout }>
      <Header/>
      <div className = { styles.main }>
          <Sider/>
          { children }
      </div>
    </div>
   );
}
 
export default Layaout;