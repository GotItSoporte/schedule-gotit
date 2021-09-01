import React from 'react';
// styles
import styled from 'styled-components';
import useDateDay from '../hooks/useDateDay';

const StyledSession = styled.div`
    text-align: left;
    margin-top: 40px;
    margin-right: 20px;
    border-bottom: 1px solid rgba(138, 138, 138, 0.5);
    border-left: 1px solid rgba(112, 112, 112, 0.5);

    span {
      font-size: 12px;
      margin-left: 5px;
    }

    a {
      font-size: 14px;
      margin-left: 8px;
      color: #ffffff;
    }

    p{
      font-size: 14px;
      color: #ffffff;
      white-space: pre-wrap;
    }
`;

const SessionInfo = ({ session, index }) => {
  //const [ value, stasrtTime, finishTime ] = session;
  const day = useDateDay( session?.startTime )
  return ( 
    <StyledSession>
      <span>{ day }</span><br />
      <a>{ session.value } minutos</a>
      <p>{ session.description || '----' }</p>
    </StyledSession>
  );
}
 
export default SessionInfo;