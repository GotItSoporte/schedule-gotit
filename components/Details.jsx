import React from 'react';
import useUser from '../context/hooks/useUser';
import useTasks from '../context/hooks/useTasks';
//MAterial UI
import { Grid } from '@material-ui/core';
// Components
import SessionInfo from './SessionInfo'; 
import Button from '../components/Button'
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
    .descripcion {
      margin-top: 40px;
      span {
        font-size: 15px;
      }

      p {
        font-size: 14px;
        color: #ffffff;
        white-space: pre-wrap;
      }
          }
  }
`;

const StyledInfo = styled( Grid )`

  .campo {
    text-align: left;
    margin-top: 40px;
    margin-right: 20px;
    border-bottom: 1px solid rgba(138, 138, 138, 0.5);
    border-left: 1px solid rgba(112, 112, 112, 0.5);

    span {
      font-size: 12px;
      margin-left: 5px;
    }

    a {
      font-size: 14px;
      margin-left: 8px;
      color: #ffffff;
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
              <StyledInfo container  >
                <div className= 'campo'>
                  <span>USUARIO</span><br />
                  <a>{ user?.name }</a>
                </div>
                <div className= 'campo'>
                  <span>ESTADO</span><br />
                  <a>{ currentTask?.state}</a>
                </div>
                <div className= 'campo'>
                  <span>NOMBRE DE CONTACTO</span><br />
                  <a>{ currentTask?.contact.name }</a>
                </div>
                <div className= 'campo'>
                  <span>EMAIL DE CONTACTO</span><br />
                  <a>{ currentTask?.contact.email }</a>
                </div>
                <div className= 'campo'>
                  <span>ECHA DE CREACIÓN</span><br />
                  <a>{ reqDate }</a>
                </div>
                <div className= 'campo'>
                  <span>CÓDIGO DE REFERENCIA</span><br />
                  <a>{ currentTask?.ref }</a>
                </div>
                <div className= 'campo'>
                  <span>FECHA DE FINALIZACIÓN</span><br />
                  <a>{ currentTask?.finishDate ||'----'}</a>
                </div>
              </StyledInfo>
              <div className= 'descripcion'>
                <span>Descripción del requerimiento</span>
                <p>{ currentTask?.requirement }</p>
              </div>
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
              <div>

              </div>
            </div>
            {/* Si el caso ya fue tomado */}
            <div >
              { currentTask?.isTask ?
                <>
                  <StyledInfo container >
                    <div className= 'campo'>
                      <span>Propietario del caso</span><br />
                      <a>{ currentTask?.member?.name || '-----' }</a>
                    </div>
                    <div className= 'campo'>
                      <span>Email de contacto</span><br />
                      <a>juanse@got-it.tv</a>
                    </div>
                    <div className= 'campo'>
                      <span>Tiempo de solución</span><br />
                      <a>{ currentTask.time } Minutos</a>
                    </div>
                  </StyledInfo>
                  <div className='descripcion'>
                    <span>Descripcion de la solución</span>
                    <p>{ currentTask?.description || '' }</p>
                  </div>
                  
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