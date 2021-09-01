import React, { useState, useEffect } from 'react';
// lin router
import { useRouter } from 'next/router';
import Link from 'next/link';
// compponets
import BtnsContainer from './layout/BtnsContainer';
// contexts
import useProjects from '../context/hooks/useProjects';
import useTasks from '../context/hooks/useTasks';
//
import { Grid } from '@material-ui/core';
//styles
import styled from 'styled-components';
import device from '../styles/styledBreakPoints';

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
   & h1 {
     font-size: 30px;
     color: ${ props => props.theme[ 'primary' ] };
     text-transform: uppercase;
     text-align: center;
     margin-bottom: 15px;
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

const ProjectList = ({ userRole }) => {
  // contexts 
  const projectsState = useProjects();
  const { projectsList, setCurrentProject } = projectsState;
  //
  const tasksState = useTasks();
  const { getTasksProject } = tasksState;
  useEffect(() => {
  }, [  ])
  
  return ( 
  
     <StyledPage 
      container
     >
       <div >
          <section className = 'container'>
            <h1>{ userRole? 'PROYECTOS' : 'TUS PROYECTOS'}</h1>
              <div >
                  <StyledTable >
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            { userRole? <th>Cliente</th> : null}
                            <th className = 'on-desktop' >HORAS RESTANTES</th>
                            <th className = 'on-desktop' >HORAS USADAS</th>
                            <th className = 'on-desktop' >HORAS TOTALES</th>
                            <th className = 'on-mobile' >HORAS USADAS</th>
                            <th>FECHA DE INICIO</th>
                            <th></th>
                        </tr>
                    </thead>
                  </StyledTable>
              </div>
              <div >
                  <StyledTable >
                    <tbody>
                      {projectsList?.map( (project)=> 
                          <Project 
                            key = { project._id }
                            project = { project }
                            setCurrentProject = { setCurrentProject }
                            getTasksProject = { getTasksProject }
                            userRole = { userRole }
                          />
                      )}
                    
                    </tbody>
                  </StyledTable>
              </div>
            </section>
       </div>
     </StyledPage>

  );
}

const Project = ({ project, setCurrentProject, getTasksProject, userRole })  =>{
    // Router
    const router = useRouter();

  let name =project.name;
  // calculate hours
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const showSstartDate = new Date(project.startDate)

  const linkProject =  id =>{
    setCurrentProject( project )
    getTasksProject( id );
    router.push( `/project/${ id }` )
  }

  let timeTotal = project?.time[ project?.currentMonth - 1 ].minutes;
  let timeUsed = project?.time[ project?.currentMonth - 1 ].minutesUsed;
  let timeLeft = (timeTotal - timeUsed) / 60 ;
  timeTotal = parseFloat( (timeTotal / 60). toFixed(1));
  timeUsed = parseFloat( (timeUsed / 60). toFixed(1));
  return  (
    <tr>
      <td> { name }</td>
        { userRole? <td>{  project.company}</td> : null}
        <td className = 'on-desktop' >{ Math.floor(timeLeft)  }</td>
        <td className = 'on-desktop' >{ timeUsed }</td>
        <td className = 'on-desktop' >{ timeTotal }</td>
        <td className = 'on-mobile' >{ timeUsed } / { timeTotal }</td>
        <td >{ showSstartDate.toLocaleDateString( 'es-Es', dateOptions) }</td>
        <td>
          <BtnsContainer
            itemID = { project._id }
            seeFunc ={ linkProject }
            showEdit = { userRole === 'admin' }
            showDelete = { false }
          />
        </td>
    </tr>    
  )
}

export default ProjectList;
