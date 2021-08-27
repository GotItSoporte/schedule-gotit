import React, { useEffect } from 'react';
// components
import TextInput from './inputs/TextInput';
import TextAreaIput from './inputs/TextAreaInput';
import SelectInput from './inputs/SelectInput';
// MAterial UI
import SubmitButton from './SubmitButton';
import { MenuItem, Grid } from '@material-ui/core';
// forms validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
// styles
import { StyledForm } from '../../styles/StyledForm';
// 


const ReqForm = ({ projects, submitFunction, edit, initialValues }) => {  
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
       <StyledForm 
        container
        justifyContent = 'center'
        alignItems = 'center'
       >

        <Grid 
          className = 'form-container'
          container
          direction = 'column'
          justifyContent = 'center'
          alignItems = 'center'
          item
          xs = { 12 }
          md = { 8 }
        >
          <h1>{ edit? 'EDITAR REQUERIMIENTO' : 'NUEVO REQUERIMIENTO'}</h1>
          <form onSubmit={formik.handleSubmit} >
            <TextInput 
              type="text"
              label="Título" 
              name="name" 
              fullWidth
  
              value = { formik.values.name }
              onChange = { formik.handleChange }
              error = { formik.touched.name && Boolean( formik.errors.name ) }
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextInput 
              type="text" 
              name="contact.name" 
              label="Nombre de contacto" 
              fullWidth
  
              value = { formik.values.contact?.name  }
              onChange = { formik.handleChange }
              error = { formik.touched.contact?.name && Boolean( formik.errors.contact?.name  ) }
              helperText={formik.touched.contact?.name  && formik.errors.contact?.name  }
            />
            <TextInput 
              type="text" 
              name="contact.email" 
              label="Correo de Contacto" 
              fullWidth
  
              value = { formik.values.contact?.email }
              onChange = { formik.handleChange }
              error = { formik.touched.contact?.email && Boolean( formik.errors.contact?.email ) }
              helperText={formik.touched.contact?.email && formik.errors.contact?.email }
            />
            <TextInput 
              type="text" 
              name="contact.cellphone" 
              label="Numero telefonico de contacto" 
              fullWidth
  
              value = { formik.values.contact?.cellphone }
              onChange = { formik.handleChange }
              error = { formik.touched.contact?.cellphone && Boolean( formik.errors.contact?.cellphone ) }
              helpertext={formik.touched.contact?.cellphone && formik.errors.contact?.cellphone }
            />
  
            {/* SELECT */}
           
            { !edit?
              <>
                <SelectInput
                  labelId = 'selectProject'
                  label = 'Proyeto'
                  fullWidth
                  
                  options = { projects }
                  inputProps={{
                    name : 'project'
                  }}
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
                </SelectInput>
              </>
              :
              null
            }
            <TextAreaIput 
              type="" 

              name="requirement" 
              label="Por favor describa su requerimiento" 
              fullWidth
  
              value = { formik.values.requirement }
              onChange = { formik.handleChange }
              error = { formik.touched.requirement && Boolean( formik.errors.requirement ) }
              helperText={formik.touched.requirement && formik.errors.requirement}
  
            />
           <SubmitButton 
              fullWidth
              type="submit" 
              textButton = 'Enviar'
            />
          </form>

        </Grid>
     </StyledForm>
   </>
  );
}
 
export default ReqForm;