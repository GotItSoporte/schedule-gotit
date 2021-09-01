import React from 'react';
// styles
import styled from 'styled-components';

const StyledDescription = styled.div`
  margin-top: 40px;
  span {
    font-size: 15px;
  }
  p {
    font-size: 14px;
    color: #ffffff;
    white-space: pre-wrap;
  }
`;

const DetailDescription = ({ title, info }) => {
  return ( 
    <StyledDescription >
      <span>{ title }</span><br />
      <p>{ info }</p>
    </StyledDescription>
  );
}
 
export default DetailDescription;