import React, { useEffect, useState } from 'react';
// MaterialUi
import { InputLabel, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import { IconButton } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
// componets
import TimeInput from './TimeInput';
import TextInput from './TextInput';
import Button from '../../Button';
//hooks
import useDateDay from '../../../hooks/useDateDay';
// styles
import styled from 'styled-components';
import device from '../../../styles/styledBreakPoints';

const StyledSessions = styled(Grid)`
   
`;

const StyledContainer = styled(Grid)`
padding: 0 0 0.5rem 0;
& div{
    padding: 0 0 0.5rem 0;
  }
`;
const StyledLabel = styled(InputLabel)`
  padding: 0.5rem 0  0.5rem 0 !important;
   color : ${ props => props.theme[ 'secondary' ] } !important;
`;


const StyledDeleteButton = styled(IconButton)`
  border-color : ${ props => props.theme[ 'secondary' ] } !important;
  color : ${ props => props.theme[ 'secondary' ] } !important;
`;

const SessionsInput = ({ sessions, formikSetFieldValue, formikTouchedSessions, formikErrorsSessions }) => {
  // Add Session chekBox;
  const handleAddSession = () => {
    const newSessions =  sessions.map( e => e );
    newSessions.push({
      startTime : null,
      finishTime : null,
      values : 0,
      valueWeight : 1,
    })
    formikSetFieldValue( 'sessions', newSessions )
  }
  // delete session 
  const deleteSession = ( index ) => {
    const newSessions =  sessions.map( e => e );
    newSessions.splice( index, 1 );
    formikSetFieldValue( 'sessions', newSessions )
  }
  // set dates
  const transformDate = date => {
    const dateOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(date)
      .toLocaleDateString( 'es-Es', dateOptions );
  }
  const handleTimeChange = ( field, index ) => {
    // calculate minutes
    let minutes = new Date ( sessions[ index ].finishTime ) -  new Date ( sessions[ index ].startTime );
    minutes = Math.floor( minutes/60e3 );      
    formikSetFieldValue( field, minutes );
  }
  // update Time everytime somo object at session value change 
  useEffect(() => {
    formikSetFieldValue( 
      'time', 
      sessions.reduce( ( acc, session ) => acc += session.value, 0 ) 
     );
  }, [ sessions ]);
  return ( 
    <div>Sessions</div>
  );
}
 
export default SessionsInput;