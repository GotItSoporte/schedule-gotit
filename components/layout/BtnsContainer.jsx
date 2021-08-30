import React from 'react';
// 
import { Button } from '@material-ui/core';
import { Visibility, EditRounded, DeleteOutline} from '@material-ui/icons';
//styles
import styled from 'styled-components';
const StyledButtonsContainer = styled.div`
   display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin: 1rem 0 0 0 !important;
  border-color: ${ props=> props.theme.secondary } !important;
  width: 5rem;
  font-weight: 900 !important;
  & span {
    color : ${ props=> props.theme['secondary'] } !important;
    padding: 0%.4rem;
  }
`;

const syledDelete = styled(Button)` 
  font-family: 'Open Sans', Arial, sans-serif;
  padding: 5;
  border-radius: 3px;
  background-color: #F2622A;
  color: #eee;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  svg{
    width: 0.8rem;
    height: 0.8rem;
    padding: 0 0 0 0;
  }
  :hover {
    background-color: #F4A261;
    cursor: pointer;
  }
`;

const BtnsContainer = ({ seeFunc, editFunc, deleteFunc, itemID, showEdit, showDelete }) => {

  const editFunc0 = ( itemID ) =>{
    console.log('Editar ', itemID )
  }
  
  const deleteFunc0 = ( itemID ) =>{
    console.log('Eliminar ', itemID )
  }
  return ( 
  <StyledButtonsContainer >
    <StyledButton 
      variant = 'outlined'
      onClick = { () => seeFunc( itemID ) } 
    >Ver</StyledButton>

    { showEdit?  
      <a 
        onClick = { () => editFunc0( itemID ) } 
      > Editar <EditRounded/></a> 
    : null } 

    { showDelete ?
      <a 
        onClick = { () => deleteFunc0( itemID) } 
        className =  '_btn_delete'
      ><DeleteOutline/></a>
    : null }
  </StyledButtonsContainer> );
}
 

export default BtnsContainer;