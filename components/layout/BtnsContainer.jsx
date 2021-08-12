import React from 'react';
// 
import { } from '@material-ui/icons';
import { Visibility, EditRounded, DeleteOutline} from '@material-ui/icons';
//
import styles from '../../styles/btns.module.scss';

const BtnsContainer = ({ seeFunc, editFunc, deleteFunc, itemID, showEdit, showDelete }) => {

  const seeFunc0 = ( itemID ) =>{
    console.log('Ver mas ', itemID )
  }
  
  const editFunc0 = ( itemID ) =>{
    console.log('Editar ', itemID )
  }
  
  const deleteFunc0 = ( itemID ) =>{
    console.log('Eliminar ', itemID )
  }
  return ( 
  <div className = {styles.btns_container}>
    <a 
      onClick = { () => seeFunc( itemID ) } 
      className = { styles._btn }
    >Ver Mas </a> 

    { showEdit?  
      <a 
        onClick = { () => editFunc0( itemID ) } 
        className = { styles._btn }
      > Editar <EditRounded/></a> 
    : null } 

    { showDelete ?
      <a 
        onClick = { () => deleteFunc0( itemID) } 
        className = { styles._btn_delete }
      ><DeleteOutline/></a>
    : null }
  </div> );
}
 

export default BtnsContainer;