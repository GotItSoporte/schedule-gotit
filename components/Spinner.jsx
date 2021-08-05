import React from 'react';
// styles 
import styles from '../styles/spinner.module.scss';
const Spinner = () => {
  return ( 
    <div className = { styles.lds_facebook }><div></div><div></div><div></div></div>
  );
}
 
export default Spinner;