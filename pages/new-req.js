import React, { useEffect } from 'react';
// routing
import { useRouter } from 'next/router';
// context 
import useUser from '../context/hooks/useUser';
import useProjects from '../context/hooks/useProjects';
import useTasks from '../context/hooks/useTasks';
// compponents
import Header from '../components/layout/Header';
// api
import { scheduleApi } from '../config/axios';
// MAterial UI
import { Select, MenuItem } from '@material-ui/core';
// forms validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
//
import { TextField } from '@material-ui/core';
// styles
import styles from '../styles/forms.module.scss'

// yup
const taskSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  contact: Yup.string()
    .required('Required'),
  project: Yup.string()
    .required('Required'),
  requirement: Yup.string(),
});

// get Server Props
export async function getServerSideProps(context) {

  const { company } =context.query
  const result = await scheduleApi.get(`/projects${ company? `?company=${ company }`: '' }`);

  if( !result ){ 
    return{
      notFound: true,
    } 
  }

  //const projects = [error];
 return {
   props: {
     projects : result.data.projects
   }, // will be passed to the page component as props
 }
}

const NewReq = ({ projects }) => {
  // router
  const router = useRouter();
  // context 
  const projectsContext = useProjects();
  const { currentProject, projectsList, setProjectsList } = projectsContext;
  // context 
  const tasksContext = useTasks();
  const { createRequirement } = tasksContext;

  // useEffect
  useEffect( ()=>{
    setProjectsList( projects )
  }, [ ])

  const setNewTask =  values =>{
    const data = {
       name : values.name,
       contact : values.contact,
       requirement : values.requirement,
       project : values.project,
    }
    console.log( 'Nuevo req', data )
    //createRequirement( data )
    console.log( 'values ', {data} )
  }
  
  const handleSelectChange = values=>{
      if( !values.project ){
        console.log(' NO HAY PROYECTO ', {values})
      }
  }
  return ( 
    <>  
      <Header/>
      <div className={ styles.Form}>
      <h1>Nuevo Requerimiento</h1>
      <Formik
        initialValues = {{
          name : '',
          contact : '',
          requirement : '',
          project : '',
        }}
        validationSchema = { taskSchema }
        handleSelectChange
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

          {/* SELECT */}
          <Field
            component ={ Select }
            name = 'project'
            label = 'Proyeto'
            fullWidth
            select
            inputProps={{
              id: 'select_id',
            }}
            onChange = { ( e ) => handleSelectChange (formik.values)}
          >
           
            { projectsList?.map( project => 
              <MenuItem
                value ={ project._id }
              >
                { project.name }
              </MenuItem> 
            ) }
          </Field>
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
  </>
   );
}


 
export default NewReq;