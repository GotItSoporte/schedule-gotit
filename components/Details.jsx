import React from 'react';
import useUser from '../context/hooks/useUser';
import useTasks from '../context/hooks/useTasks';
//componetes

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
    <div id = { styles.Informacion }>
          <div id={ styles.Informacion2 }>
            <div id={ styles.InfoRequerimiento }>
              <div id={ styles.Titulo }>
                <h1>{ currentTask?.name }</h1>
              </div>
              <div className={ styles.InfoContacto }>
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
              </div>
              <div className={ styles.Descripcion }>
                <span>Descripción del requerimiento</span>
                <p>{ currentTask?.requirement }</p>
              </div>
            </div>
            {/* Si el caso ya fue tomado */}
            <div id={ styles.InfoSolucion }>
              { currentTask?.isTask ?
                <>
                  <div className={ styles.InfoContacto }>
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
                  </div>
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
                >{ user.role ? 'Gestionar' : 'Editar'}</button>
              </div>
              :
              null
            }
          </div>
    </div>
   );
}
 
export default Details;