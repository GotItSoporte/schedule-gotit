import React, { useEffect, useState } from 'react';
//next router
import Link from 'next/link';
// contexts
import useTasks from '../../context/hooks/useTasks';
// styles
import styles from '../../styles/pages.module.scss';

const TasksList = () => {
 // Projects Tasklist
 const tasksContext = useTasks();
 const { state : tasksState, setTasksList } = tasksContext;
 const { tasksList } = tasksState
  useEffect(() => {
    console.log( tasksList )
  }, [tasksList]);
  return ( 
     
    <section className ={ styles.section }>
     <h4>LISTA DE TAREAS</h4>
     <div className={ styles.tbl_header }>
         <table >
         <thead>
             <tr>
                 <th>NOMBRE</th>
                 <th>TIEMPO DE TAREA</th>  
                 <th>ESTADO</th>  
                 <th></th>                   
             </tr>
         </thead>
         </table>
     </div>
     <div className ={ styles.tbl_content }>
         <table >
         <tbody>
             { tasksList.map( task => 
                (<Task
                  key= { task._id }
                  task ={ task }
                />)
             ) }
         </tbody>
         </table>
     </div>
     <button type="submit" className={ styles.NuevoRequerimiento }>Agregar Requerimiento</button>
  </section>
   );
}
 
const Task = ({ task }) => {
  // task context
  const tasksContext = useTasks();
  const { setCurrentTask } = tasksContext;
  const { name, hours, startDate } = task

  return(
    <tr>
      <td>{name}</td>
      <td>{hours}</td>
      <td>Activo/Pendiente/Cerrado</td>
      <a href="#">Ver Más</a>
    </tr>
  );
}
export default TasksList;