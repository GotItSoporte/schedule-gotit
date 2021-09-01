import React from 'react';
// MAterial UI
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const StyledTextInput = styled( TextField )`
  width: 100%;
  margin-bottom: 1rem !important;
 
  label {
    color : ${ props => props.theme['secondary'] } !important;
    z-index: 1;
    padding-left: 0.5rem;
    font-size: 0.8rem;
  }

	div{
    background-color: ${ props => props.theme['background-light-color'] };
    color: ${ props => props.theme['color-input-text'] };
    box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2);    
    width: 100%; 
    height: 2.3rem;  
    outline: none;
    padding: 10px;
    font-size: 13px;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 4px;
    :focus { 
      box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px #ffffff73; 
    }
    ::before{
      display: none !important;
    }
    ::after{
      border-color: ${ props => props.theme['primary'] };
      margin : 1rem 0.5rem 0.5rem 0.5rem;
    }
		input{
			&::placeholder{
				position:absolute;
				color:${ props => props.theme['color-text'] };
			}
		}
    
  }
`;

const TextInput = ({ 
  label,
  styles,
  type,
  name, 
  fullWidth, 
  value,
  onChange, 
  error, 
  helperText 
}) => {
  //const classes = useStyles();
  return ( 
    <StyledTextInput 
      label = { label }
      className = { styles }
      type= { type }
      name= { name } 
      fullWidth = { fullWidth }
      value = { value }
      onChange = { onChange }
      error = { error }
      helperText={ helperText }
    />
   );
}
 
export default TextInput;