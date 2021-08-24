import React, { useEffect, useState } from 'react';
//componetes
import Header from '../../../components/layout/Header';
import Details from '../../../components/Details';
import TaskForm from '../../../components/forms/TaskForm';
import ReqForm from '../../../components/forms/ReqForm';

// context 
import useUser from '../../../context/hooks/useUser';
import useProjects from '../../../context/hooks/useProjects';
import useTasks from '../../../context/hooks/useTasks';

import styles from '../../../styles/pages.module.scss';

import { scheduleApi } from '../../../config/axios';

export async function getServerSideProps(context) {
  const { query } = context
  let result ;
  try {
    result = await scheduleApi.get( `/tasks/${ query.taskID }` )
  } catch (error) {

  }
  return {
    props: { task : result.data.task }, // will be passed to the page component as props
  }
}

const Task = ({ task }) => {
     // context 
  const projectsContext = useProjects();
  const { projectsList } = projectsContext;

  // userContext
  const userContext = useUser();
  const { state: userState, isAuthenticated } = userContext; 
  const { isAuth, user } = userState;
  // userContext
  const taskContext = useTasks();
  const { state: taskState, editRequirement, setReqAsTask, editActiveTask } = taskContext; 
  const { currentTask } = taskState;
  let isTask = currentTask?.isTask || false;
  let finished = currentTask?.finished || false;

  const [ showForm, setShowForm ] = useState( false );

  // Formik objects
  let initialValues = {
    name           : currentTask?.name ,
    contact        : currentTask?.contact,
    requirement    : currentTask?.requirement ,
  }
   let initialValuesTask = {
     time : currentTask?.time || 0,
     sessions : currentTask?.sessions,
     finished : currentTask?.finished,
     success : currentTask?.success,
     description : currentTask?.description,
   }
  useEffect(() => {
    initialValues = {
      name           : currentTask?.name ,
      contact        : currentTask?.contact,
      requirement    : currentTask?.requirement ,
    }
  }, [currentTask] )
  // update function
  const updateReq = async values =>{

    for( let property in values.contact ){
        values.contact[ property ] = values.contact[ property ] || currentTask.contact[ property ];
    }
    for( let property in values ){
      if( !values[ property ] ){ 
        delete values[ property ]
       }
    }
      await editRequirement( values, currentTask._id );
    setShowForm( false )
  }
  
  const setAsTask = async values => {
    values.time = parseInt( values.time )
    console.log( 'setAs', { values } )
    await setReqAsTask( values, currentTask._id );
    setShowForm( false )
  }

  const editTask = async values => {
    values.time = parseInt( values.time )
    console.log( 'Editt',{ values } )
    await editActiveTask( values, currentTask._id );
    setShowForm( false )
  }
  return ( 
    <>
      <Header/>
      <div id={ styles.Informacion }>
            <Details
              editable = { !isTask || ( user?.role && !finished  )   }
              user ={ user }
              showForm = { showForm }
              setShowForm = { setShowForm }
            />
        {
          showForm?
            user?.role ?
            <TaskForm
                isrequeriment = {true}
                projects = { projectsList }
                submitFunction = { isTask? editTask : setAsTask}
                edit = { true }
                task = { currentTask }
                initialValues = { initialValuesTask }
            />
            : 
            <ReqForm 
                isrequeriment = {true}
                projects = { projectsList }
                submitFunction = { updateReq }
                edit = { true }
                task = { currentTask }
                initialValues = { initialValues }
            />
          :null
        }

    </div>


    </>
   );
}
 
export default Task;