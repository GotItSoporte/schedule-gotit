import React from 'react';
//next router
import { useRouter } from 'next/router';
// components
import BtnsContainer from '../layout/BtnsContainer';
// contexts
import useTasks from '../../context/hooks/useTasks';
import useProjects from '../../context/hooks/useProjects';
// styles
import styled from 'styled-components';
import device from '../../styles/styledBreakPoints';

const StyledTable = styled.table`
   table-layout: fixed;
   width: 100%;
   margin-left: auto;
   margin-right: auto;
   min-width: 400px;
   th {
     background: linear-gradient(#2e658b, #26495f);
     padding: 10px 7px;
     text-align: left;
     font-weight: 500;
     color: ${ props => props.theme['color-input-text'] };
     text-transform: uppercase;
    }
    td {
      padding: 15px;
      text-align: left;
      vertical-align: middle;
      font-weight: 300;
      font-size: 10px;
      overflow:hidden;
      color: ${ props => props.theme['color-text'] };
      border-right: 1px solid ${ props => props.theme['color-text'] };
      border-left: 1px solid ${ props => props.theme['color-text'] };
      border-top: 1px solid ${ props => props.theme['color-text'] };
      border-bottom: 1px solid ${ props => props.theme['color-text'] };
      @media ${ device.md }{
        font-size: 15px;
        
      }
   }
   .on-mobile{
    @media ${ device.md }{
      display: none;
    }
   }
   .on-desktop{
     display: none;
    @media ${ device.md }{
      display: table-cell;
    }
   }
   a {
     font-family: 'Open Sans', Arial, sans-serif;
     padding: 5;
     border-radius: 3px;
     background-color: ${ props => props.theme['secondary'] }; 
     color: ${ props => props.theme['color-text'] };
     font-weight: bold;
     text-transform: uppercase;
     text-decoration: none;
  
     :hover {
       background-color: ${ props => props.theme[ 'secondary-light' ] };
     }
   }
`;

const TasksList = () => {
 // Router
  const router = useRouter();

 const tasksContext = useTasks();
 const { state : tasksState, setTasksList } = tasksContext;
 const { tasksList } = tasksState
 //
  const projectsContext = useProjects();
  const { currentProject } = projectsContext;

  return ( 
     
    <section>
         <StyledTable >
         <thead>
             <tr>
                 <th>NOMBRE</th>
                 <th className ='on-desktop'>REF</th>
                 <th className ='on-desktop'>REQUERIDO POR :</th>
                 <th className ='on-desktop'>CONTACTO</th>  
                 <th>ESTADO</th>  
                 <th className ='on-desktop'>REQUERIDO El :</th> 
                 <th></th>                   
             </tr>
         </thead>
         </StyledTable>

     <div >
         <StyledTable >
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
         </StyledTable>
     </div>
  </section>
   );
}
 
const Task = ({ task, router , currentProject }) => {

  const tasksContext = useTasks();
  const { setCurrentTask } = tasksContext;
  const { 
    ref,
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
   const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   const showedDate = `${new Date(requirmentDate).toLocaleDateString( 'es-ES', dateOptions ) } ${ new Date(requirmentDate).getHours() } : ${ new Date(requirmentDate).getMinutes() } `

  const linkTask= () =>{
    setCurrentTask( task )
    router.push( {
      pathname : `/project/${currentProject._id}/task`,
      query :{ taskID : _id }
    })
  }


  return(
    <tr>
      <td>{ name }</td>
      <td className ='on-desktop' >{ ref }</td>
      <td className ='on-desktop' >{ requieredUser.name || 'no especificado' }</td>
      <td className ='on-desktop' >{ contact.name || 'no especificado' }</td>
      <td >{ state }</td>
      <td className ='on-desktop' >{ showedDate}</td>
      <td >
        <BtnsContainer
          itemID ={ task._id }
          seeFunc = {linkTask}  
        />
      </td>
    </tr>
  );
}
export default TasksList;