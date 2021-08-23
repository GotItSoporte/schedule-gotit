import React from 'react';
// routing
import { useRouter } from 'next/router';
// components
import TextInput from './inputs/TextInput';
import CheckBox from './inputs/CheckBox';
import TimeInput from './inputs/TimeInput';
// MAterial UI
import SubmitButton from './SubmitButton';
import { Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
// forms validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
//
import { TextField, InputLabel } from '@material-ui/core';
// styles
import styles from '../../styles/forms.module.scss';


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
       <div className={ styles.Form }>

        <div className={ styles.Form2 }>
          <h1>EDITAR TAREA</h1>
          <form onSubmit={formik.handleSubmit} >
            <TextInput 
              styles = { styles.FormId }
              type="text"
              placeholder="Título" 
              name="time" 
              fullWidth
  
              value = { formik.values.time }
              onChange = { formik.handleChange }
              error = { formik.touched.time && Boolean( formik.errors.time ) }
              helperText={formik.touched.time && formik.errors.time}
            />
            <MuiPickersUtilsProvider  utils = { DateFnsUtils }>
              {
                formik.values.sessions?.map ( ( session, index ) => 
                <div
                    key = { index }
                >
                    <TimeInput
                      fullWidth
                      id = { `${index}-start` }
                      value = { formik.values.sessions[ index ].startTime }
                      label = 'Hora de inicio'
                      formikSetFieldValue= {  formik.setFieldValue  }
                    />
                    <TimeInput
                    fullWidth
                    id = { `${index}-finish` }
                    value = { formik.values.sessions[ index ].finishTime }
                    label = 'Hora de finalizacion'
                    formikSetFieldValue= {  formik.setFieldValue  }
                  />
                  </div>
                )
              }

            </MuiPickersUtilsProvider>
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
            <TextField 
              className={ styles.textArea } 
              type="textarea" 
              multiline
              name="description" 
              placeholder="Por favor escriba suna breve descripción de la solución" 
              fullWidth
  
              value = { formik.values.description }
              onChange = { formik.handleChange }
              error = { formik.touched.description && Boolean( formik.errors.description ) }
              helperText={formik.touched.description && formik.errors.description}
  
            />
            <SubmitButton styles={ styles.btn } textButton = { 'ENviar'} />
          </form>

        </div>
     </div>
   </>
  );
}
 
export default TaskForm;