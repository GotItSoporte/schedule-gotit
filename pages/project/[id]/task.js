import React from 'react';
//componetes
import Header from '../../../components/layout/Header';
import Details from '../../../components/Details';
import TaskForm from '../../../components/forms/TaskForm';

// context 
import useUser from '../../../context/hooks/useUser';
import useProjects from '../../../context/hooks/useProjects';

import styles from '../../../styles/pages.module.scss';



const Task = () => {
     // context 
  const projectsContext = useProjects();
  const { currentProject, projectsList, getProjectsList } = projectsContext;

  // userContext
  const userContext = useUser();
  const { state: userState, isAuthenticated } = userContext; 
  const { isAuth, user } = userState;

    const updateReq = async values =>{
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
        console.log( 'update req', data )
        //await createRequirement( data )
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