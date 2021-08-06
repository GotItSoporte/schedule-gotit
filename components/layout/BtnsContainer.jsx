import React from 'react';
// 
import { } from '@material-ui/icons';
import { Visibility, EditRounded, DeleteOutline} from '@material-ui/icons';
//
import styles from '../../styles/btns.module.scss';

const BtnsContainer = ({ seeFunc, editFunc, deleteFunc, itemID }) => {

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
    ><Visibility/></a> 

    <a 
      onClick = { () => editFunc0( itemID ) } 
      className = { styles._btn }
    ><EditRounded/></a> 

    <a 
      onClick = { () => deleteFunc0( itemID) } 
      className = { styles._btn_delete }
    ><DeleteOutline/></a>
  </div> );
}
 

export default BtnsContainer;