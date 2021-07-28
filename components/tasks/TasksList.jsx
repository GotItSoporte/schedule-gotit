import React, { useEffect, useState } from 'react';

const TasksList = ({ tasksList }) => {
  useEffect(() => {
    console.log( 'tasklist ',tasksList )
  }, [tasksList]);
  return ( 
    <div>
      <h3> Lista de Tareas { tasksList?.length }</h3>
      { tasksList?.map( task => 
        <div>
        <p>ggg</p>
        <p>{ task.name }</p>
        <p>{ task.hours }</p>
        <p>{ task.startDate }</p>
    </div>
      ) }
    </div>
   );
}
 
const Task = ({ task }) => {
  console.log('DESDE TAREA', task)
  const { name, hours, startDate } = task
  return(
    <div>
        <p>ggg</p>
        <p>{ name }</p>
        <p>{ hours }</p>
        <p>{ startDate }</p>
    </div>
  );
}
export default TasksList;