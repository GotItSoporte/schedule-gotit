import React from 'react';
// routing
import { useRouter } from 'next/router';
// forms validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// context 
import useUser from '../../../context/hooks/useUser';
import useProjects from '../../../context/hooks/useProjects';
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
  const { currentProject } = projectsContext;

  const setNewTask = ( values ) =>{
    
    console.log( 'Nuevo req', currentProject )
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
        <Field 
          className={ styles.FormId } 
          type="textarea" 
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