import React from 'react';
// routing
import { useRouter } from 'next/router';
// components
import TextInput from './inputs/TextInput';
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
      decription: Yup.string(),
      finished: Yup.string(),
    })
  :
    Yup.object({
      time: Yup.string().required('Debes especificar el tiempo empleado'),
      decription: Yup.string().required( 'Es necesario escribir una breve descripción' ),
      finished: Yup.string().required( 'Especifica si se ha finalizao' ),
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

            <TextField 
              className={ styles.textArea } 
              type="textarea" 
              multiline
              name="decription" 
              placeholder="Por favor describa su requerimiento" 
              fullWidth
  
              value = { formik.values.decription }
              onChange = { formik.handleChange }
              error = { formik.touched.decription && Boolean( formik.errors.decription ) }
              helperText={formik.touched.decription && formik.errors.decription}
  
            />
            <SubmitButton styles={ styles.btn } textButton = { 'ENviar'} />
          </form>

        </div>
     </div>
   </>
  );
}
 
export default TaskForm;