import React, { useEffect, useState } from 'react';

// styles
import styles from '../../styles/pages.module.scss';

const TasksList = ({ tasksList }) => {
  useEffect(() => {
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
             <tr>
                 <td>nombre requerimiento</td>
                 <td>tiempo de tarea</td>
                 <td>Activo/Pendiente/Cerrado</td>
                 <td><a href="#">Ver Más</a></td>
             </tr>
         </tbody>
         </table>
     </div>
     <button type="submit" className={ styles.NuevoRequerimiento }>Agregar Requerimiento</button>
  </section>
   );
}
 
const Task = ({ task }) => {
  const { name, hours, startDate } = task
  return(
    <tr>
      <td>nombre requerimiento</td>
      <td>tiempo de tarea</td>
      <td>Activo/Pendiente/Cerrado</td>
      <td><a href="#">Ver Más</a></td>
    </tr>
  );
}
export default TasksList;