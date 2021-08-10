import React, { useEffect, useState } from 'react';
//next router
import Link from 'next/link';
import { useRouter } from 'next/router';
// components
import BtnsContainer from '../layout/BtnsContainer';
// contexts
import useTasks from '../../context/hooks/useTasks';
import useProjects from '../../context/hooks/useProjects';
// icons
// styles
import styles from '../../styles/pages.module.scss';

const TasksList = () => {
 // Router
  const router = useRouter();

 const tasksContext = useTasks();
 const { state : tasksState, setTasksList } = tasksContext;
 const { tasksList } = tasksState
 //
  const projectsContext = useProjects();
  const { currentProject } = projectsContext;

  useEffect(() => {
    console.log( tasksList )
  }, [tasksList]);

  const onNewreq = () => {
    console.log( 'cliv' )
    router.push( `/project/${currentProject._id}/new-req` )
  }
  return ( 
     
    <section className ={ styles.section }>
     <h4>LISTA DE TAREAS</h4>
     <div className={ styles.tbl_header }>
         <table >
         <thead>
             <tr>
                 <th>NOMBRE</th>
                 <th>REQUERIDO POR :</th>
                 <th>CONTACTO</th>  
                 <th>ESTADO</th>  
                 <th>REQUERIDO El :</th> 
                 <th></th>                   
             </tr>
         </thead>
         </table>
     </div>
     <div className ={ styles.tbl_content }>
         <table >
         <tbody>
             { tasksList.map( (task, index) => 
                (<Task
                  key= { index }
                  task ={ task }
                  router = { router }
                  currentProject = { currentProject }
                />)
             ) }
         </tbody>
         </table>
     </div>
     <button 
        type="button" 
        className={ styles.NuevoRequerimiento }
        onClick = { () => onNewreq() }
      >Agregar Requerimiento </button>
  </section>
   );
}
 
const Task = ({ task, router , currentProject }) => {

  const tasksContext = useTasks();
  const { setCurrentTask } = tasksContext;
  const { 
    name, 
    hours, 
    startDate, 
    state, 
    member, 
    timeWeight, 
    contact, 
    requeriment, 
    description,
    requirmentDate,
    requieredUser,
    _id
   } = task


  const linkTask= () =>{
    setCurrentTask( task )
    router.push( {
      pathname : `/project/${currentProject._id}/task`,
      query :{ taskID : _id }
    })
  }


  return(
    <tr>
      <td>{name}</td>
      <td>{ requieredUser.name || 'no especificado' }</td>
      <td>{ contact.name || 'no especificado' }</td>
      <td>{ state }</td>
      <td>{ requirmentDate }</td>
      <td className = {styles.btns_container}>
        <BtnsContainer
          itemID ={ task._id }
          seeFunc = {linkTask}  
        />
      </td>
    </tr>
  );
}
export default TasksList;