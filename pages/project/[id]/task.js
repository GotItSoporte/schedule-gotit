import React, { useEffect, useState } from 'react';
//componetes
import Header from '../../../components/layout/Header';
import Details from '../../../components/Details';
import TaskForm from '../../../components/forms/TaskForm';
import ReqForm from '../../../components/forms/reqForm';

// context 
import useUser from '../../../context/hooks/useUser';
import useProjects from '../../../context/hooks/useProjects';
import useTasks from '../../../context/hooks/useTasks';

import styles from '../../../styles/pages.module.scss';

import { scheduleApi } from '../../../config/axios';
import { curryRight } from 'lodash';

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
  const { state: taskState, editRequirement } = taskContext; 
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
     time : currentTask?.time * currentTask?.timeWeight,
     finished : currentTask?.finished,
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
  
  return ( 
    <>
      <Header/>
      <div id={ styles.Informacion }>
            <Details
              editable = { (!user?.role && !isTask) || ( user?.role && isTask && !finished )   }
              user ={ user }
              showForm = { showForm }
              setShowForm = { setShowForm }
            />
        {
          showForm?
            isTask ?
            <TaskForm
                isrequeriment = {true}
                projects = { projectsList }
                submitFunction = { updateReq }
                edit = { true }
                task = { currentTask }
                initialValues = { initialValues }
            />
            : 
            <ReqForm 
                isrequeriment = {true}
                projects = { projectsList }
                submitFunction = { updateReq }
                edit = { true }
                task = { currentTask }
                initialValues = { initialValuesTask }
            />
          :null
        }

    </div>


    </>
   );
}
 
export default Task;