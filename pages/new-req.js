import React, { useEffect } from 'react';
// routing
import { useRouter } from 'next/router';
// context 
import useUser from '../context/hooks/useUser';
import useProjects from '../context/hooks/useProjects';
import useTasks from '../context/hooks/useTasks';
// compponents
import Header from '../components/layout/Header';
import TaskForm from '../components/forms/TaskForm';
// api
import { scheduleApi } from '../config/axios';
// forms validation
import { useFormik, Form, Field, validateYupSchema } from 'formik';
import * as Yup from 'yup';

const NewReq = () => {
  // router
  const router = useRouter();
  // context 
  const projectsContext = useProjects();
  const { currentProject, projectsList, getProjectsList } = projectsContext;
  // context 
  const tasksContext = useTasks();
  const { createRequirement } = tasksContext;

  // userContext
  const userContext = useUser();
  const { state: userState, isAuthenticated } = userContext; 
  const { isAuth, user } = userState;

   // useEffect
   useEffect( ()=>{
    if( !isAuth ){
      if( !isAuth ){
        authentication();
      }
      getProjects( user?.company );
    }
  }, [ isAuth ]);
  //
  const authentication = async () => {
    await isAuthenticated();
    if( !isAuth ){
      router.push( '/login' )
    }
  }
  const getProjects = async company => {
    if( company ){
      await getProjectsList( company )
    }
  }
  //
  const setNewTask = async values =>{
    const data = {
       name : values.name,
       contact : {
        name : values.contactName,
        email : values.contactMail,
        cellphone : values.contactNumber,
      },
       requirement : values.requirement,
       project : values.project,
    }
    console.log( 'Nuevo req', data )
    await createRequirement( data )
  }
  return ( 
    <>  
      <Header/>
      <TaskForm
        isrequeriment = {true}
        projects = { projectsList }
        submitFunction = { setNewTask }
      />   
    </>
  );
}


 
export default NewReq;