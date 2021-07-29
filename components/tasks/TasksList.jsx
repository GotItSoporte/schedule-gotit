import React, { useEffect, useState } from 'react';

const TasksList = ({ tasksList }) => {
  useEffect(() => {
  }, [tasksList]);
  return ( 
    <div>
      <h3> Lista de Tareas { tasksList?.length }</h3>
      { tasksList?.map( task => 
        <Task
          key = { task._id }
          task = { task }
        />
      ) }
    </div>
   );
}
 
const Task = ({ task }) => {
  const { name, hours, startDate } = task
  return(
    <div>
        <p>Tarea : { name }</p>
        <p> horas :{ hours }</p>
        <p> fecha :{ startDate }</p>
    </div>
  );
}
export default TasksList;