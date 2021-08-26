import React from 'react';
// MAterial UI
import { Select, InputLabel, MenuItem } from '@material-ui/core';
//styles
import styled from 'styled-components'
const StyledLabel = styled( InputLabel )`
  margin : 1rem 0 0.5rem 0;
  color : ${ props => props.theme['secondary'] } !important;
`;

const StyledSelect =styled( Select )`
  width: 100%;
  margin-bottom: 10px;
  outline: none;
  padding: 10px;
  font-size: 13px;
  border: 1px solid rgba(0,0,0,0.3) !important;
  border-radius: 4px;
  box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2) !important;
  
  svg {
    color: ${ props => props.theme['secondary'] };
  }

  ::before{
      display: none !important;
  }
  ::after{
    border-color: ${ props => props.theme['primary'] };
    margin : 1rem 0.5rem 0.5rem 0.5rem;
  }
	div{
    color:${ props => props.theme['color-input-text'] };
	}
`;

const SelectInput = ({ 
  options,
  inputProps,
  label, 
  idLabel, 
  value, 
  onChange, 
  error, 
  helpertext, 
  fullWidth, 
  }) => {
  return ( 
    <>
        <StyledLabel id = { idLabel }> { label } </StyledLabel>
        <StyledSelect   
          labelId     = { idLabel }
          fullWidth   = { fullWidth }
          inputProps  = { inputProps }
          inputProps  = { inputProps}
          value       = { value }
          onChange    = { onChange }
          error       = { error }
          helpertext  = { helpertext }
        >
          { options?.map(( option, index) => 
            <MenuItem
              key = { index }
              value ={ option._id }
            >
              { option.name }
            </MenuItem> 
          ) }
        </StyledSelect>
      </>
  );
}
 
export default SelectInput;