import React from 'react';

const ErrorForm = ({ classStyle, errorMessage }) => {
  return ( 
    <div className ={ classStyle }>
      <p> { errorMessage } </p>
    </div>
   );
}
 
export default ErrorForm;