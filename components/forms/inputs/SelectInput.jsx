import React from 'react';
// MAterial UI
import { Select, InputLabel } from '@material-ui/core';
import styles from '../../../styles/forms.module.scss';
const SelectInput = ({ 
  children,
  label, 
  idLabel, 
  value, 
  onChange, 
  error, 
  helpertext, 
  fullWidth, 
  inputProps 
  }) => {
  return ( 
    <>
        <InputLabel id = { idLabel }> { label } </InputLabel>
        <Select
          className   = { styles.select }
          
          labelId     = { idLabel }
          fullWidth   = { fullWidth }
          inputProps  = { inputProps}
          value       = { value }
          onChange    = { onChange }
          error       = { error }
          helpertext  ={ helpertext }
        >
          { children }
        </Select>
      </>
  );
}
 
export default SelectInput;