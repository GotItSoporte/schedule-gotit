import React, { useEffect } from 'react';
// 
import { useRouter } from 'next/router';
// components
import Header from '../../components/layout/Header'
// contexts
import useProjects from '../../context/hooks/useProjects';
import useTasks from '../../context/hooks/useTasks';
import useUser from '../../context/hooks/useUser';
// http
import { scheduleApi } from '../../config/axios';
// material ui
import { Grid, Button } from '@material-ui/core';
// components 
import TasksList from '../../components/tasks/TasksList';
// styles 
import styled from 'styled-components';
import device from '../../styles/styledBreakPoints';

const StyledPage = styled(Grid)`
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  & .container{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    padding: 2rem 0.5rem 4rem 0.5rem;
    background-color: #2E4054;
    border-radius: 10px; 
    @media ${device.md} { 
      padding: 2rem 4rem 4rem 4rem;
    background-color: #2E4054;
    }
  }
   h1 {
     font-size: 30px;
     color: ${ props => props.theme[ 'primary' ] };
     text-transform: uppercase;
     text-align: center;
     margin-bottom: 15px;
   }
   h4 {
    font-size: 20px;
    font-weight: bold !important;
    color:  ${ props => props.theme['secondary'] };
    text-transform: uppercase;
    font-weight: 300;
    text-align: center;
    margin-bottom: 15px;
    display: grid;
    place-content: center;
   }
  `;

const StyledTable = styled.table`
   table-layout: fixed;
   width: 100%;
   margin-left: auto;
   margin-right: auto;
   min-width: 420px;
   & th {
     background: linear-gradient(#2e658b, #26495f);
     padding: 10px 7px;
     text-align: left;
     font-weight: 500;
     color: ${ props => props.theme['color-input-text'] };
     text-transform: uppercase;
    }
    & td {
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
   & .on-mobile{
    @media ${ device.md }{
      display: none;
    }
   }
   & .on-desktop{
     display: none;
    @media ${ device.md }{
      display: table-cell;
    }
   }
   & a {
     font-family: 'Open Sans', Arial, sans-serif;
     padding: 5;
     border-radius: 3px;
     background-color: ${ props => props.theme['secondary'] }; 
     color: ${ props => props.theme['color-text'] };
     font-weight: bold;
     text-transform: uppercase;
     text-decoration: none;
  
     & &:hover {
       background-color: ${ props => props.theme[ 'secondary-light' ] };
     }
   }
`;

const StyledButton = styled(Button)`
  background-color: ${ props=> props.theme.secondary } !important;
  color : ${ props=> props.theme['color-input-text'] } !important;
  font-weight: 900 !important;
`;

const Project = ({ project, tasks }) => {
  // next routing 
  const router = useRouter();
  // Projects Contexts
  const projectContext = useProjects();
  // Tasks Context
  const tasksContext = useTasks();
  const { state :tasksState , setTasksList } = tasksContext;
  // Users Contexts
  const userContext = useUser();
  const { state :userState  } = userContext;
  const { user, isAuth } =userState;
  
  useEffect( async () => {
    if( !isAuth ){
      authentication();
    }
     await setTasksList( tasks );

  }, [ tasks ]);
  
  //
  const authentication = async () => {
    
    await getProjectsList( company );
  }

  // calculate hours
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const startDate = new Date( project?.startDate ).toLocaleDateString( 'es-ES', dateOptions)
  const finishDate = project?.finishDate? new Date( project?.finishDate ).toLocaleDateString( 'es-ES', dateOptions)
         : 'No asignada';
  let timeTotal = project?.time[ project?.currentMonth - 1 ].minutes;
  let timeUsed = project?.time[ project?.currentMonth - 1 ].minutesUsed;
  let timeLeft = (timeTotal - timeUsed) / 60 ;
  timeTotal = timeTotal / 60;

  return ( 
    <>
      <Header /> 
      <StyledPage >
          <section className = 'container'>
              { user?.role? <h1>{ user?.company }</h1> : null }
              <h1>{ project?.name || 'No Encontrado' }</h1>
              <div>
                  <StyledTable >
                  <thead>
                      <tr>
                          <th>MESES</th>
                          <th>HORAS RESTANTES</th>
                          <th>HORAS USADAS</th>
                          <th>HORAS TOTALES</th>
                          <th>FECHA DE INICIO</th>
                          <th>FECHA DE Finalizacion</th>
                      </tr>
                  </thead>
                  </StyledTable>
              </div>
             <StyledTable >
              <tbody>
                  <tr>
                      <td>{ project.months }</td>
                      <td>{ Math.floor(timeLeft)  }</td>
                      <td>{ timeUsed }</td>
                      <td>{ timeTotal }</td>
                      <td>{ startDate }</td>
                      <td>{ finishDate }</td>
                  </tr>
              </tbody>
             </StyledTable>
            <h4>REQUERIMIENTOS</h4>
            
            { tasksState? <TasksList /> : <h2>No hay tareas para mostrar</h2>}
            { !user?.role?
              <StyledButton 
                type="button" 
                onClick = { () => router.push( {
                  pathname : '/new-req',
                  query :{ company : user?.company }
                } )}
              >Agregar Requerimiento </StyledButton>
              : null
            }
          </section>
           <div >
        </div>
      </StyledPage>
  </>
   );
}
 
export default Project;

// initial props
export async function getServerSideProps(context) {
  const { id } = context.params;
    let project =  null;
    let tasks =  null;
    let message = null;
    let notFound= true; 
  try {
    let result = await scheduleApi.get( `/projects/${id}` );
    project = result.data.project
    result = await scheduleApi.get( `/projects/${id}/tasks` );
    tasks = result.data.tasks;
    message = 'llamado a api exitoso';
    notFound = false
  } catch (error) {
      message = 'Hubo un error al obtener el proyecyo';
      notFound = true;
  }
  return {
    props:{
      project,
      tasks,
      message,
      notFound
    } , // will be passed to the page component as props
  }
 }