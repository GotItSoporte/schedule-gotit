import React, { useEffect } from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers'


const TimeInput = ({id, label, value, formikSetFieldValue, onChange }) => {
  // update session time everytime some date change
  useEffect(() => {
    onChange()

  }, [ value ])
  const handleChange = date => {
    formikSetFieldValue(id, date)
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