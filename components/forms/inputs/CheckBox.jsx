import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from "@material-ui/core";


const CheckBox = ({ id, checked, onBlur, onChange, label  }) => {
  return ( 
    <FormControlLabel
      control={<MuiCheckbox id = { id } />}
      checked = { checked}
      onBlur = { onBlur}
      onChange = { onChange }
      
      label= { label }
      labelPlacement="end"
    />
  );
}
 
export default CheckBox;