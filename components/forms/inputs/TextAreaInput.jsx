import React from 'react';
// MAterial UI
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const StyledTextArea = styled( TextField )`
  width: 100%;
  margin-bottom: 1rem !important;
 
  label {
    color : ${ props => props.theme['secondary'] } !important;
    z-index: 1;
    padding-left: 0.5rem;
    font-size: 1rem;
    height: 10rem;
  }

	div{
    background-color: ${ props => props.theme['background-light-color'] };
    color: ${ props => props.theme['color-input-text'] };
    box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2);    
    width: 100%; 
    min-height: 5rem;  
    outline: none;
    
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
		textarea{
      padding: 1rem 0.5rem 0.5rem 1rem;
      height: 100%;
			&::placeholder{
				position:absolute;
				color:${ props => props.theme['color-text'] };
        min-height: 10rem;
			}
		}
    input:-webkit-autofill {
      color: rgb(0,0,0,0) !important;
    }
  }
`;

const TextAreaIput = ({ 
  label,
  name, 
  fullWidth, 
  value,
  onChange, 
  error, 
  helperText 
}) => {
  //const classes = useStyles();
  return ( 
    <StyledTextArea 
      label = { label }
      multiline 
      name= { name } 
      fullWidth = { fullWidth }
      value = { value }
      onChange = { onChange }
      error = { error }
      helperText={ helperText }
    />
   );
}
 
export default TextAreaIput;