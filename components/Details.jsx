import React from 'react';
import useUser from '../context/hooks/useUser';
import useTasks from '../context/hooks/useTasks';
//MAterial UI
import { Grid } from '@material-ui/core';
// Components
import SessionInfo from './SessionInfo'; 
import Button from '../components/Button';
import DetailText from './DetailText';
import DetailDescription from './DetailDescription';
//styles
import styled from 'styled-components';
import device  from '../styles/styledBreakPoints';

const StyledDetails = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  @media ${ device.md }{
    max-width: 95%;
    margin-left: 5px;
    margin-right: 5px;
  }
  span {
    color: ${ props => props.theme.secondary };
    font-weight: bold;
  }
  #informacion{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    padding: 30px 60px 60px 60px;
    background-color: #2E4054;
    border-radius: 10px;
    max-width: 50rem;
    #infoRequerimiento {
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(218, 218, 218, 0.5);
      
      #titulo {
        color: ${ props => props.theme.primary };
        border-bottom: 1px solid rgba(218, 218, 218, 0.5);
        text-align: center;
      
        h1 {
          margin-bottom: 5px;
        }
      }
    }
  }
`;

const Details = ({ editable, showForm, setShowForm }) => {
  // userContext
  const userContext = useUser();
  const { state: userState, isAuthenticated } = userContext; 
  const { user } = userState;
  // tsk Context
  const taskContext = useTasks();
  const { state: taskState } = taskContext; 
  const { currentTask } = taskState;

  const handleClick = () => {
    setShowForm( !showForm )
  }
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const reqDate = new Date( currentTask?.requirmentDate ).toLocaleDateString( 'es-ES', dateOptions)
  
  return ( 
    <StyledDetails >
          <div id= 'informacion'>
            <div id= 'infoRequerimiento'>
              <div id= 'titulo'>
                <h1>{ currentTask?.name }</h1>
              </div>
              <Grid container  >
                <DetailText  title = 'Usuario' info = { user?.name } />
                <DetailText  title = 'estado' info = { currentTask?.state } />
                <DetailText  title = 'nombre de contacto' info = { currentTask?.contact.name } />
                <DetailText  title = 'fecha de creación' info = { reqDate } />
                <DetailText  title = 'CÓDIGO DE REFERENCIA' info = { currentTask?.ref } />
                <DetailText  title = 'FECHA DE FINALIZACIÓN' info = { currentTask?.finishDate ||'----' } />
              </Grid>
              <DetailDescription  title = 'Descripción del requerimiento' info = { currentTask?.requirement } />
              {
                currentTask?.isTask? 
                  currentTask?.sessions?.map( (session, index) => 
                    <SessionInfo
                      key = { index }
                      index = { index }
                      session = { session }
                    /> 
                  )
                : null
              }

            </div>
            {/* Si el caso ya fue tomado */}
            <div >
              { currentTask?.isTask ?
                <>
                  <Grid container >
                    <DetailText  title = 'Propietario del caso' info = { currentTask?.member?.name || '-----'} />
                    <DetailText  title = 'Email de contacto' info = {  currentTask?.member?.email || '-----' } />
                    <DetailText  title = 'Tiempo de solución' info = { currentTask.time } />
                  </Grid>
                  <DetailDescription  title = 'Descripcion de la solución' info = { currentTask?.description || '' } />                  
                </>
                : null
              }
            </div>
            
            { editable? 
                <div>
                <Button 
                  onClick = { handleClick } 
                  textButton = { user?.role ? 'Gestionar' : 'Editar'}
                />
              </div>
              :
              null
            }
          </div>
    </StyledDetails>
   );
}
 
export default Details;