import React from 'react';
//
const SubmitButton = ({ textButton, styles }) => {

  return ( 
    <button 
      type="submit" 
      className={ styles }
    >{ textButton }</button>
  );
}
 
export default SubmitButton;