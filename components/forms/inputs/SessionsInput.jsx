import React, { useEffect, useState } from 'react';
// MaterialUi
import { InputLabel, Grid, Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';

// componets
import TimeInput from './TimeInput';
import TextInput from './TextInput';

//hooks
import useDateDay from '../../../hooks/useDateDay';
// styles
import styled from 'styled-components';

const StyledSessions = styled(Grid)`
  margin: 0 0 1rem 0;
`;

const StyledContainer = styled(Grid)`
padding: 0 0 0.5rem 0;
& div{
    padding: 0 0 0.5rem 0;
    color : ${ props => props.theme[ 'color-input-text' ]  };
    & label {
      color : ${ props => props.theme[ 'color-text' ] };
    }
  }
`;
const StyledLabel = styled(InputLabel)`
  padding: 0.5rem 0  0.5rem 0 !important;
   color : ${ props => props.theme[ 'secondary' ] } !important;
`;

const StyledAddButton = styled(Button)`
  max-width: 12rem;
   border-color : ${ props => props.theme[ 'secondary' ] } ;
`;

const StyledDeleteButton = styled(Button)`
   border-color : ${ props => props.theme[ 'secondary' ] } !important;
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
    <StyledSessions 
      container
      direction =  'column'
    >
        <MuiPickersUtilsProvider  utils = { DateFnsUtils }  >
        {sessions?.map ( ( session, index ) => 
        <StyledContainer 
          key ={ index }
          container
          justifyContent = 'space-between'
          alignItems = 'center'
        > 
          <Grid item xs = { 12 }>
            <StyledLabel id = 'sessionsPickers'> Sesión del { transformDate (session.startTime) } </StyledLabel>
          </Grid>
          <Grid item xs = { 6 } md = { 3 }>
            <TimeInput
              fullWidth
              id = { `sessions.${index}.startTime` }
              value = { sessions[ index ].startTime }
              label = 'Hora de inicio'
              formikSetFieldValue= { formikSetFieldValue }
              onChange = { () => handleTimeChange( `sessions.${index}.value`, index ) }
              />
          </Grid>
          <Grid item xs = { 6 } md = { 3 }>
            <TimeInput
              fullWidth
              id = { `sessions.${index}.finishTime` }
              value = { sessions[ index ].finishTime }
              label = 'Hora de finalizacion'
              formikSetFieldValue= { formikSetFieldValue }
              onChange = { () => handleTimeChange( `sessions.${index}.value`, index ) }
            />
          </Grid>
          <Grid item xs = { 4 } md = { 1 }>
            <TextInput
              type="text"
                label = 'minutos'
              placeholder="minutes" 
              name= { `sessions.${index}.value` } 
              value = { sessions[ index ].value || 0}
              
              error = { formikTouchedSessions?.value && Boolean( formikErrorsSessions?.value ) }
              helperText={ formikTouchedSessions?.value && formikErrorsSessions?.value }
            />
          </Grid>
          <Grid item xs = { 4 } md = { 2 }>
            <StyledDeleteButton 
              variant="outlined"
              onClick = {() => deleteSession( index ) }
            > X</StyledDeleteButton>
          </Grid>
      </StyledContainer >
        )}
        </MuiPickersUtilsProvider>
        
      <StyledAddButton 
        variant = 'outlined'
        onClick = { handleAddSession }
      > Agregr Sesión</StyledAddButton>
    </StyledSessions>
  );
}
 
export default SessionsInput;