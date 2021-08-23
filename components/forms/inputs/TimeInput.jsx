import React from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers'

const TimeInput = ({id, label, value, formikSetFieldValue }) => {

  const handleChange = date => {
    console.log("___", date);
    formikSetFieldValue("startDate", date)
  }
  return ( 
    <KeyboardTimePicker
          margin="normal"
          id= { id }
          label= { label }
          value={ value} 
          onChange={ handleChange }

          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
    />
   );
}
 
export default TimeInput;