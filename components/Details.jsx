import React from 'react';
import useUser from '../context/hooks/useUser';
import useTasks from '../context/hooks/useTasks';
//componetes

//styles
import styled from 'styled-components';

const StyledDetails = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  display: grid;
  place-content: center;
  max-width: 95%;
  span {
    color: ${ props => props.theme.secondary };
    font-weight: bold;
  }
  #informacion{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    padding: 30px 60px 60px 60px;
    background-color: #2E4054;
    border-radius: 10px;
    
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
    #infosolucion {

    }
  }
`;

const styledInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);    
  grid-gap: 10px;
`;

import styles from '../styles/pages.module.scss';

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
              <styledInfo >
                <div className={ styles.Campos }>
                  <span>USUARIO</span><br />
                  <a>{ user?.name }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>ESTADO</span><br />
                  <a>{ currentTask?.state}</a>
                </div>
                <div className={ styles.Campos }>
                  <span>NOMBRE DE CONTACTO</span><br />
                  <a>{ currentTask?.contact.name }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>EMAIL DE CONTACTO</span><br />
                  <a>{ currentTask?.contact.email }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>ECHA DE CREACIÓN</span><br />
                  <a>{ reqDate }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>CÓDIGO DE REFERENCIA</span><br />
                  <a>{ currentTask?.ref }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>FECHA DE FINALIZACIÓN</span><br />
                  <a>{ currentTask?.finishDate || 'En curso' }</a>
                </div>
              </styledInfo>
              <div className={ styles.Descripcion }>
                <span>Descripción del requerimiento</span>
                <p>{ currentTask?.requirement }</p>
              </div>
            </div>
            {/* Si el caso ya fue tomado */}
            <div >
              { currentTask?.isTask ?
                <>
                  <styledInfo >
                    <div className={ styles.Campos }>
                      <span>Propietario del caso</span><br />
                      <a>{ currentTask?.member?.name || '-----' }</a>
                    </div>
                    <div className={ styles.Campos }>
                      <span>Email de contacto</span><br />
                      <a>juanse@got-it.tv</a>
                    </div>
                    <div className={ styles.Campos }>
                      <span>Tiempo de solución</span><br />
                      <a>{ currentTask.time } Minutos</a>
                    </div>
                  </styledInfo>
                  <div className={ styles.Descripcion }>
                    <span>Descripcion de la solución</span>
                    <p>{ currentTask?.description || '' }</p>
                  </div>
                  
                </>
                : null
              }
            </div>
            
            { editable? 
                <div  id={styles.btn}>
                <button 
                  onClick = { handleClick } id={ styles.BotEditar }
                >{ user?.role ? 'Gestionar' : 'Editar'}</button>
              </div>
              :
              null
            }
          </div>
    </StyledDetails>
   );
}
 
export default Details;