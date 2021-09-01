import React from 'react';
// components
import TextInput from './inputs/TextInput';
import TextAreaIput from './inputs/TextAreaInput';
import CheckBox from './inputs/CheckBox';
import SessionsInput from './inputs/SessionsInput';
// MAterial UI
import SubmitButton from './SubmitButton';
// forms validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
//
import { Grid } from '@material-ui/core';
// styles
import { StyledForm } from '../../styles/StyledForm';

const TaskForm = ({  submitFunction, edit, initialValues }) => {
  // yup
  const taskSchema = edit ?
  Yup.array({
    time: Yup.number(),
    sessions : Yup.array().of (
      Yup.object({
          startTime : Yup.date().nullable(),   
          finishTime : Yup.date().nullable(),    
        })
        ),
      finished: Yup.boolean(),
      success: Yup.boolean(),
      description: Yup.string(),
    })
    :
    Yup.object({
      time: Yup.string().required('Debes especificar el tiempo empleado'),
      sessions : Yup.array().of (
        Yup.object({
          startTime : Yup.date().nullable(),   
          finishTime : Yup.date().nullable(),    
        })
        ),      
      finished: Yup.boolean(),
      success: Yup.boolean(),
      description: Yup.string().required( 'Es necesario escribir una breve descripción' ),
    });
    
    //
    const submit = async values =>{
      submitFunction( values )
      formik.resetForm();
    }
    
    const formik = useFormik({
      initialValues,
      validationSchema : taskSchema,
      onSubmit : values =>{submit( values )},
      
    });
    
   return ( 
     <>  
       <StyledForm 
        container
        justifyContent = 'center'
        alignItems = 'center'
       >

        <Grid 
          container
          direction = 'column'
          alignItems = 'center'
          className = 'form-container'
          item
          xs = { 12 }
          md = { 8 }
        >
          <h1>EDITAR TAREA</h1>
          <form onSubmit={formik.handleSubmit} >
           
            <SubmitButton textButton = { 'ENviar'} />
          </form>

        </Grid>
     </StyledForm>
   </>
  );
}
 
export default TaskForm;