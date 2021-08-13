import React from 'react';
// MAterial UI
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PlayCircleFilledWhite } from '@material-ui/icons';
const styledTextInput = withStyles({
  root: {
    background: 'white',
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white'
      }
    }
  }
})( TextField );

const TextInput = ( 
  styles,
  type,
  name, 
  placeholder, 
  fullWidth, 
  value,
  onChange, 
  error, 
  helpertext ) => {
  return ( 
    <styledTextInput 
      className={ styles } 

      type= { type }
      name= { name } 
      placeholder= { placeholder } 
      fullWidth = { fullWidth }
      value = { value }
      onChange = { onChange }
      error = { error }
      helpertext={ helpertext }
    />
   );
}
 
export default TextInput;