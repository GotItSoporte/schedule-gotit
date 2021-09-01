import React from 'react';
// styles
import styled from 'styled-components';

const StyledInfoField = styled.div`
  text-align: left;
    margin-top: 40px;
    margin-right: 20px;
    border-bottom: 1px solid rgba(138, 138, 138, 0.5);
    border-left: 1px solid rgba(112, 112, 112, 0.5);

    span {
      font-size: 12px;
      margin-left: 5px;
      text-transform: uppercase;
    }

    a {
      font-size: 14px;
      margin-left: 8px;
      color: #ffffff;
    }
`;

const DetailText = ({ title, info }) => {
  return ( 
    <StyledInfoField >
      <span>{ title }</span><br />
      <a>{ info }</a>
    </StyledInfoField>
  );
}
 
export default DetailText;