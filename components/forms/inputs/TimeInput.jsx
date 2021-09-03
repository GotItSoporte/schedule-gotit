import React, { useEffect } from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers'
import styled from 'styled-components';
/**  */
const StyledTimePicker = styled(KeyboardTimePicker)`
border-radius: 1rem;
border-color :${ props => props.theme[ 'color-input-text' ] };
    label {
      color : ${ props => props.theme[ 'secondary' ] };
      width: 10rem;
    }
  input{
    color : ${ props => props.theme[ 'color-text' ] };
  }
  div{
    button{
      color : ${ props => props.theme[ 'secondary' ] };
    }
    :before{
        display: none !important;
      }
      ::after{
        border-color: ${ props => props.theme['primary'] };
        margin : 1rem 0.5rem 0.5rem 0.5rem;
      }
  }
`;

const TimeInput = ({id, label, value, formikSetFieldValue, onChange }) => {
  // update session time everytime some date change
  useEffect(() => {
    onChange()

  }, [ value ])
  const handleChange = date => {
    formikSetFieldValue(id, date)
  }
  return ( 
    <StyledTimePicker
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