import React from 'react';
// routing
import { useRouter } from 'next/router';
// context 
import useUser from '../../../context/hooks/useUser';
import useProjects from '../../../context/hooks/useProjects';
import useTasks from '../../../context/hooks/useTasks';
// MAterial UI
import { Select, MenuItem } from '@material-ui/core';
// forms validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
//
import { TextField } from '@material-ui/core';
// styles
import styles from '../../../styles/forms.module.scss'

// yup
const taskSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  contact: Yup.string()
    .required('Required'),
  requirement: Yup.string(),
});

const NewReq = () => {
  // router
  const router = useRouter();
  // context 
  const projectsContext = useProjects();
  const { currentProject, projectsList } = projectsContext;
  // context 
  const tasksContext = useTasks();
  const { createRequirement } = tasksContext;


  const setNewTask = ( values ) =>{
    const data = {
       name : values.name,
       contact : values.contact,
       requirement : values.requirement,
       project : currentProject._id,
    }
    console.log( 'Nuevo req', data )
    createRequirement( data )
  }
  
  return ( 
    <div className={ styles.Form}>
    <h1>Nuevo Requerimiento</h1>
    <Formik
      initialValues = {{
        name : '',
        contact : '',
        requirement : '',
      }}
      validationSchema = { taskSchema }
      onSubmit = {  values => setNewTask( values ) }
    >
      <Form method="post">
        <Field 
          className={ styles.FormId } 
          type="text"
          name="name" 
          placeholder="Título" 
          required="required" 
        />
        <Field 
          className= { styles.FormId }  
          type="text" 
          name="contact" 
          placeholder="Contacto (Nombre + Correo)" 
          required="required" 
        />
        <Select
          name = 'project'
         
        >
          { projectsList.map( project => 
            <MenuItem
              value ={ project._id }
            >
              { project.name }
            </MenuItem> 
          ) }
          
        </Select>
        <TextField 
          className={ styles.textArea } 
          type="textarea" 
          multiline
          name="requirement" 
          placeholder="Escriba su requerimiento" 
          required="required" 
          defaultValue={""} 
        />
        <button type="submit" className={ styles.btn }>Enviar</button>
      </Form>
    </Formik>
  </div>
   );
}

 
export default NewReq;