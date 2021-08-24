import React from 'react';
// MAterial UI
import { TextField } from '@material-ui/core';

const TextInput = ({ 
  label,
  styles,
  type,
  name, 
  placeholder, 
  fullWidth, 
  value,
  onChange, 
  error, 
  helperText 
}) => {
  //const classes = useStyles();
  return ( 
    <TextField 
      label = { label }
      className = { styles }
      type= { type }
      name= { name } 
      placeholder= { placeholder } 
      fullWidth = { fullWidth }
      value = { value }
      onChange = { onChange }
      error = { error }
      helperText={ helperText }
    />
   );
}
 
export default TextInput;