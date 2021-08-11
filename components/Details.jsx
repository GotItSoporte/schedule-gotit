import React from 'react';
import useUser from '../context/hooks/useUser';
import useTasks from '../context/hooks/useTasks';
//componetes

import styles from '../styles/pages.module.scss';

const Details = ({ editable, showFrom, setShowForm }) => {
// userContext
const userContext = useUser();
const { state: userState, isAuthenticated } = userContext; 
const { user } = userState;
// tsk Context
const taskContext = useTasks();
const { state: taskState } = taskContext; 
const { currentTask } = taskState;
console.log( { currentTask } )
  return ( 
    <>
          <div id={ styles.Informacion2 }>
            <div id={ styles.InfoRequerimiento }>
              <div id={ styles.Titulo }>
                <h1>{ currentTask?.name }</h1>
              </div>
              <div className={ styles.InfoContacto }>
                <div className={ styles.Campos }>
                  <span>Usuario</span><br />
                  <a>{ user?.name }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Estado</span><br />
                  <a>{ currentTask?.state}</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Nombre de Contacto</span><br />
                  <a>{ currentTask?.contact.name }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Email de contacto</span><br />
                  <a>{ currentTask?.contact.email }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Fecha de creacion</span><br />
                  <a>{ currentTask?.requirmentDate }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Fecha de finalización</span><br />
                  <a>{ currentTask?.finishDate || 'En curso' }</a>
                </div>
              </div>
              <div className={ styles.Descripcion }>
                <span>Descripción del requerimiento</span>
                <p>{ currentTask?.requirement }</p>
              </div>
            </div>
            <div id={ styles.InfoSolucio }>
                {/* Si el caso ya fue tomado */}
              { currentTask?.isTask ?
                <>
                  <div className={ styles.InfoContacto }>
                    <div className={ styles.Campos }>
                      <span>Propietario del caso</span><br />
                      <a>{ currentTask?.member || 'Este Caso no ha sio tomado' }</a>
                    </div>
                    <div className={ styles.Campos }>
                      <span>Email de contacto</span><br />
                      <a>juanse@got-it.tv</a>
                    </div>
                    <div className={ styles.Campos }>
                      <span>Tiempo de solución</span><br />
                      <a>3 Horas</a>
                    </div>
                  </div>
                  <div className={ styles.Descripcion }>
                    <span>Descripcion de la solución</span>
                    <p>{ currentTask?.description || 'No se ha tomado' }</p>
                  </div>
                  
                </>
                : null
              }
            </div>
          </div>
          { editable? 
              <div  id={styles.btn}>
              <button onClick = { () => setShowForm( !showFrom )  } id={ styles.BotEditar }>Editar</button>
            </div>
            :
            null
          }
    </>
   );
}
 
export default Details;