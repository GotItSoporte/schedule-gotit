import React from 'react';
// styles 
import styled, { keyframes } from 'styled-components';
const Spinner = () => {
  return ( 
    <StyledSpinner>
      <div></div><div>
      </div><div></div>
      </StyledSpinner>
  );
}
const lds_facebook  = keyframes`
 0% {
    top: 8px;
    height: 8em;
  }
  50%, 100% {
    top: 5em;
    height: 32px;
  }
 `

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100vh;
  background-color: #000000ac;
  z-index: 1;
  width: 100%;
  div {
    display: inline-block;
    left: 8px;
    width: 2em;
    background: #0877c7;
    animation: ${lds_facebook} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

    &:nth-child(1) {
      left: 8px;
      animation-delay: -0.24s;
      margin: 0 0.2rem 0 0.2rem;
    }

    &:nth-child(2) {
      left: 32px;
      animation-delay: -0.12s;
      margin: 0 0.2rem 0 0.2rem;
    }

    &:nth-child(3) {
      left: 56px;
      animation-delay: 0;
      margin: 0 0.2rem 0 0.2rem;
    }
  }
`;
 
export default Spinner;