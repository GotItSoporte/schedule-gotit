import React from 'react';
// 
import { Visibility, EditRounded, DeleteOutline} from '@material-ui/icons';
//styles
import styled from 'styled-components';
const StyledButtonsContainer = styled.div`
   display: flex;
  justify-content: space-between;
  & a{
      font-family: 'Open Sans', Arial, sans-serif;
      border-radius: 3px;
      background-color: #F2622A;
      color: #eee;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: capitalize;
      text-decoration: none;
      padding: 0.4rem 0.4rem 0.4rem 0.4rem;
    & svg{
      width: 0.8rem;
      height: 0.8rem;
      padding: 0 0 0 0;
    }
    &:hover{
      background-color: #F4A261;
      cursor: pointer;
    }
  }

  & ._btn_delete {
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
    & svg{
      width: 0.8rem;
      height: 0.8rem;
      padding: 0 0 0 0;
    }
    &:hover {
      background-color: #F4A261;
      cursor: pointer;
    }
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
    <a 
      onClick = { () => seeFunc( itemID ) } 
    >Ver Mas </a> 

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