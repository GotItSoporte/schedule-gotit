import React from 'react';
// componets
import { InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

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
    console.log( {  minutes, index, field } );
    formikSetFieldValue( field, minutes );
  }

  return ( 
    <MuiPickersUtilsProvider  utils = { DateFnsUtils }>
      {sessions?.map ( ( session, index ) => 
        <div
        key = { index }
        > 
        <InputLabel id = 'sessionsPickers'> Sesión del { transformDate (session.startTime) } </InputLabel>
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

             placeholder="minutes" 
             name= { `sessions.${index}.value` } 
             value = { sessions[ index ].value }
             
             error = { formikTouchedSessions?.value && Boolean( formikErrorsSessions?.value ) }
             helperText={ formikTouchedSessions?.value && formikErrorsSessions?.value }
          />
        </div>
      )}
      
    </MuiPickersUtilsProvider>
  );
}
 
export default SessionsInput;