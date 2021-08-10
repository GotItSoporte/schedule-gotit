import React from 'react';
// routing
import { useRouter } from 'next/router';
// compponents
// api
// MAterial UI
import { Select, MenuItem } from '@material-ui/core';
// forms validation
import { useFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
//
import { TextField } from '@material-ui/core';
// styles
import styles from '../../styles/forms.module.scss';


const TaskForm = ({ projects, submitFunction, isrequeriment, edit }) => {
  // yup
  const taskSchema = edit ?
    Yup.object({
      name: Yup.string(),
      contactName: Yup.string(),
      contactMail: Yup.string()
        .email( 'introduzca un correo valido' ),
      contactNumber: Yup.string(),
      project: Yup.string(),
      requirement: Yup.string(),
    })
  :
    Yup.object({
      name: Yup.string()
        .required('El requerimiento debe tener un titulo'),
      contactName: Yup.string()
        .required('Por favor introdusca un contacto'),
      contactMail: Yup.string()
        .email( 'introduzca un correo valido' )
        .required('Por favor introdusca correo de contacto'),
      contactNumber: Yup.string(),
      project: Yup.string()
        .required('Required'),
      requirement: Yup.string()
        .required('El requeriiento debe tener una descipcion'),
    });
   // router
   const router = useRouter();
   //
   const submit = async values =>{
      submitFunction( values )
     formik.resetForm();
   }
 
   const formik = useFormik({
     initialValues : {
       name           : '',
       contactName    : '',
       contactMail    : '',
       contactNumber  : '',
       requirement    : '',
       project        : '',
     },
     validationSchema : taskSchema,
     onSubmit : values =>submit( values ),
 
   });
   return ( 
     <>  
       <div className={ styles.Form }>
       <h1>Nuevo Requerimiento</h1>
         <form onSubmit={formik.handleSubmit} >
           <TextField 
             className={ styles.FormId } 
             type="text"
             placeholder="Título" 
             name="name" 
             fullWidth
 
             value = { formik.values.name }
             onChange = { formik.handleChange }
             error = { formik.touched.name && Boolean( formik.errors.name ) }
             helperText={formik.touched.name && formik.errors.name}
           />
           <TextField 
             className= { styles.FormId }  
             type="text" 
             name="contactName" 
             placeholder="Contacto (Nombre + Correo)" 
             fullWidth
 
             value = { formik.values.contactName }
             onChange = { formik.handleChange }
             error = { formik.touched.contactName && Boolean( formik.errors.contactName ) }
             helperText={formik.touched.contactName && formik.errors.contactName }
           />
           <TextField 
             className= { styles.FormId }  
             type="text" 
             name="contactMail" 
             placeholder="Correo Contacto" 
             fullWidth
 
             value = { formik.values.contactMail }
             onChange = { formik.handleChange }
             error = { formik.touched.contactMail && Boolean( formik.errors.contactMail ) }
             helperText={formik.touched.contactMail && formik.errors.contactMail }
           />
           <TextField 
             className= { styles.FormId }  
             type="text" 
             name="contactNumber" 
             placeholder="Numero de contacto" 
             fullWidth
 
             value = { formik.values.contactNumber }
             onChange = { formik.handleChange }
             error = { formik.touched.contactNumber && Boolean( formik.errors.contactNumber ) }
             helperText={formik.touched.contactNumber && formik.errors.contactNumber }
           />
 
           {/* SELECT */}
          { !edit?
            
            <Select
              className = { styles.select }
              name = 'project'
              label = 'Proyeto'
              fullWidth
              select
  
              value = { formik.values.project }
              onChange = { formik.handleChange }
              error = { formik.touched.project && Boolean( formik.errors.project ) }
              helperText={formik.touched.project && formik.errors.project}
            >
              
              { projects?.map(( project, index) => 
                <MenuItem
                  key = { index }
                  value ={ project._id }
                >
                  { project.name }
                </MenuItem> 
              ) }
            </Select>
            :
            null
          }
           <TextField 
             className={ styles.textArea } 
             type="textarea" 
             multiline
             name="requirement" 
             placeholder="Escriba su requerimiento" 
             fullWidth
 
             value = { formik.values.requirement }
             onChange = { formik.handleChange }
             error = { formik.touched.requirement && Boolean( formik.errors.requirement ) }
             helperText={formik.touched.requirement && formik.errors.requirement}
 
           />
           <button type="submit" className={ styles.btn }>Enviar</button>
         </form>
     </div>
   </>
  );
}
 
export default TaskForm;