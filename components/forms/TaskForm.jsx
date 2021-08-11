import React from 'react';
// routing
import { useRouter } from 'next/router';
// MAterial UI
import { Select, MenuItem } from '@material-ui/core';
// forms validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
//
import { TextField } from '@material-ui/core';
// styles
import styles from '../../styles/forms.module.scss';


const TaskForm = ({ projects, submitFunction, isrequeriment, edit, initialValues }) => {
  // yup
  const taskSchema = edit ?
    Yup.object({
      name: Yup.string(),
      contact : Yup.object ({
        name :  Yup.string(),
        email :  Yup.string()
          .email( 'introduzca un correo valido' ),
        cellphone :  Yup.string(),
      }),
      project: Yup.string(),
      requirement: Yup.string(),
    })
  :
    Yup.object({
      name: Yup.string()
        .required('El requerimiento debe tener un titulo'),
      contact : Yup.object ({
        name :  Yup.string()
        .required('Por favor introdusca un contacto'),
        email :  Yup.string()
        .email( 'introduzca un correo valido' )
        .required('Por favor introdusca correo de contacto'),
        cellphone :  Yup.string(),
      }),
      project: Yup.string()
        .required('Required'),
      requirement: Yup.string()
        .required('El requeriiento debe tener una descipcion'),
    });

   //
   const submit = async values =>{
      submitFunction( values )
     formik.resetForm();
   }
 
   const formik = useFormik({
     initialValues,
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
             name="contact.name" 
             placeholder="Contacto (Nombre + Correo)" 
             fullWidth
 
             value = { formik.values.contact?.name  }
             onChange = { formik.handleChange }
             error = { formik.touched.contact?.name && Boolean( formik.errors.contact?.name  ) }
             helperText={formik.touched.contact?.name  && formik.errors.contact?.name  }
           />
           <TextField 
             className= { styles.FormId }  
             type="text" 
             name="contact.email" 
             placeholder="Correo Contacto" 
             fullWidth
 
             value = { formik.values.contact?.email }
             onChange = { formik.handleChange }
             error = { formik.touched.contact?.email && Boolean( formik.errors.contact?.email ) }
             helperText={formik.touched.contact?.email && formik.errors.contact?.email }
           />
           <TextField 
             className= { styles.FormId }  
             type="text" 
             name="contact.cellphone" 
             placeholder="Numero de contacto" 
             fullWidth
 
             value = { formik.values.contact?.cellphone }
             onChange = { formik.handleChange }
             error = { formik.touched.contact?.cellphone && Boolean( formik.errors.contact?.cellphone ) }
             helperText={formik.touched.contact?.cellphone && formik.errors.contact?.cellphone }
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