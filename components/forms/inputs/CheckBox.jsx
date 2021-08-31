import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from "@material-ui/core";
import styled from 'styled-components';

const StyledCheckBox =styled ( FormControlLabel )`
  color : ${ props => props.theme['color-input-text'] };
  span {
    color : ${ props => props.theme.secondary };
  }
`;

const CheckBox = ({ id, checked, onBlur, onChange, label  }) => {
  return ( 
    <StyledCheckBox
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