import React, { useEffect } from 'react';
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


const Task = () => {
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
            />
        <TaskForm 
            isrequeriment = {true}
            projects = { projectsList }
            submitFunction = { updateReq }
            edit = { true }
        />

    </div>


    </>
   );
}
 
export default Task;