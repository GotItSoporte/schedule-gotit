import React from 'react';
import { Button } from '@material-ui/core';
//styles
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin: 1rem 0 0 0 !important;
  border-color: ${ props=> props.theme.secondary } !important;
  width: 5rem;
  font-weight: 900 !important;
  span {
    //color : ${ props=> props.theme['color-input-text'] } !important;

  }
`;

const SimpleButton = ({ textButton, onClick }) => {

  return ( 
    <StyledButton 
      onClick = { onClick }
      variant = 'outlined'
    >{ textButton }</StyledButton>
  );
}
 
export default SimpleButton;