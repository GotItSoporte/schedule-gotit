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
import { useFormik, Form, Field, validateYupSchema } from 'formik';
import * as Yup from 'yup';
//
import { TextField } from '@material-ui/core';
// styles
import styles from '../styles/forms.module.scss'

// yup
const taskSchema = Yup.object({
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
  //
  const formik = useFormik({
    initialValues : {
      name : '',
      contact : '',
      requirement : '',
      project : '',
    },
    validateYupSchema : taskSchema,
    onSubmit : values =>setNewTask( values ),

  });
  const setNewTask =  values =>{
    const data = {
       name : values.name,
       contact : values.contact,
       requirement : values.requirement,
       project : values.project,
    }
    console.log( 'Nuevo req', data )
    createRequirement( data )
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
        <form onSubmit={formik.handleSubmit} >
          <TextField 
            className={ styles.FormId } 
            type="text"
            placeholder="Título" 
            required="required" 
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
            name="contact" 
            placeholder="Contacto (Nombre + Correo)" 
            required="required" 
            fullWidth

            value = { formik.values.contact }
            onChange = { formik.handleChange }
            error = { formik.touched.contact && Boolean( formik.errors.contact ) }
            helperText={formik.touched.contact && formik.errors.contact }
          />

          {/* SELECT */}
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
           
            { projectsList?.map( project => 
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


 
export default NewReq;