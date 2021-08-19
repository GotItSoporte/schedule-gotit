import React from 'react';
// routing
import { useRouter } from 'next/router';
// components
import TextInput from './inputs/TextInput';
import CheckBox from './inputs/CheckBox';
// MAterial UI
import SubmitButton from './SubmitButton';
import { Select, MenuItem } from '@material-ui/core';
// forms validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
//
import { TextField, InputLabel } from '@material-ui/core';
// styles
import styles from '../../styles/forms.module.scss';


const TaskForm = ({ projects, submitFunction, isrequeriment, edit, initialValues }) => {
  // yup
  const taskSchema = edit ?
    Yup.object({
      time: Yup.number(),
      description: Yup.string(),
      finished: Yup.boolean(),
      success: Yup.boolean(),
    })
  :
    Yup.object({
      time: Yup.string().required('Debes especificar el tiempo empleado'),
      description: Yup.string().required( 'Es necesario escribir una breve descripción' ),
      finished: Yup.boolean(),
      success: Yup.boolean(),
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
            <CheckBox
              id = 'finished'
              checked = { formik.values.finished }
              onBlur = { formik.handleBlur }
              onChange = { formik.handleChange }
              
              label="Se cierra el seguimiento a este requerimiento"
            />
            <CheckBox
              id = 'success'
              checked = { formik.values.success }
              onBlur = { formik.handleBlur }
              onChange = { formik.handleChange }

              label="Si, se dio solución al requerimiento"
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