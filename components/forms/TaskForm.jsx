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
import DetailText from '../DetailText';

const TaskForm = ({  submitFunction, edit, initialValues }) => {
  // yup
  const taskSchema = edit ?
  Yup.array({
    time: Yup.number(),
    sessions : Yup.array().of (
      Yup.object({
          startTime : Yup.date().nullable(),   
          finishTime : Yup.date().nullable(),    
          description : Yup.string(),    
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
          description: Yup.string().required('Debes desccribir lo que se ha hecho en la sesión.')   
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
      onSubmit : values =>{
        submit( values )
      },
      
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
            <DetailText title = 'Tiempo total invertido' info ={formik.values.time} />
            
            <SessionsInput  
              sessions = { formik.values.sessions } 
              formikSetFieldValue = {  formik.setFieldValue  }
              
              formikTouchedSessions = { formik.touched.sessions }
              formikErrorsSessions = { formik.errors.sessions }

              onChange = { formik.handleChange }
            />
            <Grid
              container
              direction = 'column'
            >
              <CheckBox
                id = 'finished'
                checked = { formik.values.finished }
                onBlur = { formik.handleBlur }
                onChange = { formik.handleChange }
                
                label="Dar el requerimiento por Cerrado"
              />
              <CheckBox
                id = 'success'
                checked = { formik.values.success }
                onBlur = { formik.handleBlur }
                onChange = { formik.handleChange }

                label="Se Ha dado solución al requerimiento"
              />
            </Grid>
            <TextAreaIput 
              name="description" 
              placeholder="Por favor escriba suna breve descripción de la solución" 
  
              value = { formik.values.description }
              onChange = { formik.handleChange }
              error = { formik.touched.description && Boolean( formik.errors.description ) }
              helperText={formik.touched.description && formik.errors.description}
  
            />
            <SubmitButton textButton = { 'ENviar'} />
          </form>

        </Grid>
     </StyledForm>
   </>
  );
}
 
export default TaskForm;