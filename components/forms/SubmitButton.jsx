import React from 'react';
import { Button } from '@material-ui/core';
//styles
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background-color: ${ props=> props.theme.secondary } !important;
  color : ${ props=> props.theme['color-input-text'] } !important;
  font-weight: 900 !important;
`;

const SubmitButton = ({ textButton, styles }) => {

  return ( 
    <StyledButton 
      fullWidth
      type="submit" 
      className={ styles }
    >{ textButton }</StyledButton>
  );
}
 
export default SubmitButton;