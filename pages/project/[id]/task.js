import React, { useEffect, useState } from 'react';
//componetes
import Header from '../../../components/layout/Header';
import Details from '../../../components/Details';
import TaskForm from '../../../components/forms/TaskForm';

// context 
import useUser from '../../../context/hooks/useUser';
import useProjects from '../../../context/hooks/useProjects';
import useTasks from '../../../context/hooks/useTasks';

import styles from '../../../styles/pages.module.scss';

import { scheduleApi } from '../../../config/axios';

export async function getServerSideProps(context) {
  const { query } = context
  let result ;
  console.log( {id : query.taskID} )
  try {
    result = await scheduleApi.get( `/tasks/${ query.taskID }` )
  } catch (error) {
    console.log( {error : error} )
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

  const [ showForm, setShowForm ] = useState( false );
  const updateReq = async values =>{
      const data = {
         name : values.name,
         contact : {
          name : values.contactName,
          email : values.contactMail,
          cellphone : values.contactNumber,
        },
         requirement : values.requirement,
      }
      await editRequirement( data, currentTask._id );
  }
  return ( 
    <>
      <Header/>
      <div id={ styles.Informacion }>
            <Details
              editable
              user ={ user }
              setShowForm = { setShowForm }
              showForm = { showForm }
            />
        {
          showForm?
          <TaskForm 
              isrequeriment = {true}
              projects = { projectsList }
              submitFunction = { updateReq }
              edit = { true }
          />

          :null
        }

    </div>


    </>
   );
}
 
export default Task;