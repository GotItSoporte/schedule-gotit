import React from 'react';
import userContext from '../context/user.context';
//componetes

import styles from '../styles/pages.module.scss';

const Details = ({ editable, user }) => {
  return ( 
    <>
          <div id={ styles.Informacion2 }>
            <div id={ styles.InfoRequerimiento }>
              <div id={ styles.Titulo }>
                <h1>Nombre del requerimiento</h1>
              </div>
              <div className={ styles.InfoContacto }>
                <div className={ styles.Campos }>
                  <span>Usuario</span><br />
                  <a>{ user.name }</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Estado</span><br />
                  <a>Activo</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Nombre de contacto</span><br />
                  <a>Ysabel Melendez</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Email de contacto</span><br />
                  <a>Ysabel@Medcom.com</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Fecha de creacion</span><br />
                  <a>10 de agosto</a>
                </div>
                <div className={ styles.Campos }>
                  <span>Fecha de finalización</span><br />
                  <a>11 de agosto</a>
                </div>
              </div>
              <div className={ styles.Descripcion }>
                <span>Descripción del requerimiento</span>
                <p>Esta es la descripcion del problema o requerimiento que se va a solicitar.</p>
              </div>
            </div>
            <div id={ styles.InfoSolucio }>
              <div className={ styles.InfoContacto }>
                <div className={ styles.Campos }>
                  <span>Propietario del caso</span><br />
                  <a>Juan Garcia</a>
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
                <p>Se reinició el Media Sequencer</p>
              </div>
            </div>
          </div>
          { editable? 
              <div  id={styles.btn}>
              <button id={ styles.BotEditar }>Editar</button>
            </div>
            :
            null
          }
    </>
   );
}
 
export default Details;