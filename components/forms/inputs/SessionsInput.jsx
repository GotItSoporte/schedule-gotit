import React, { useEffect } from 'react';
// MaterialUi
import { InputLabel, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';

// componets
import TimeInput from './TimeInput';
import TextInput from './TextInput';

const SessionsInput = ({ sessions, formikSetFieldValue, onChange, formikTouchedSessions, formikErrorsSessions }) => {

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
  }, [ sessions ])
  return ( 
    <Grid 
      container
      direction =  'column'
    >
      <MuiPickersUtilsProvider  utils = { DateFnsUtils }>
      <Grid 
        container
      > 
        {sessions?.map ( ( session, index ) => 
        <>
          <Grid item xs = { 12 }>
            <InputLabel id = 'sessionsPickers'> Sesión del { transformDate (session.startTime) } </InputLabel>
          </Grid>
            <TimeInput
              fullWidth
              id = { `sessions.${index}.startTime` }
              value = { sessions[ index ].startTime }
              label = 'Hora de inicio'
              formikSetFieldValue= { formikSetFieldValue }
              onChange = { () => handleTimeChange( `sessions.${index}.value`, index ) }
              />
            <TimeInput
              fullWidth
              id = { `sessions.${index}.finishTime` }
              value = { sessions[ index ].finishTime }
              label = 'Hora de finalizacion'
              formikSetFieldValue= { formikSetFieldValue }
              onChange = { () => handleTimeChange( `sessions.${index}.value`, index ) }
            />
            <TextInput
              type="text"
                label = 'minutos'
              placeholder="minutes" 
              name= { `sessions.${index}.value` } 
              value = { sessions[ index ].value }
              
              error = { formikTouchedSessions?.value && Boolean( formikErrorsSessions?.value ) }
              helperText={ formikTouchedSessions?.value && formikErrorsSessions?.value }
            />
        </>
        )}
      </Grid >
        
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
 
export default SessionsInput;