import React from 'react';
// componets
import Header from '../components/layout/Header';
//styles
import styles from '../styles/forms.module.scss'
const Login = () => {

  const login =()=>{
    console.log(  'login...'  );
  }
  return ( 
    <>
      <Header/>
        <div className={ styles.login }>
          <h1>Login</h1>
          <form  onSubmit = { ()=> login() } >
            <input 
              className= {styles.LoginId}
               type="text" 
               name="user" 
               placeholder="Usuario" 
               required="required" 
              />
            <input 
              className={styles.LoginId} 
              type="password" 
              name="password" 
              placeholder="Contraseña" 
              required="required" 
            />
            <button type="submit" className={ styles.btn }>Iniciar Sesión</button>
          </form>
        </div>
    </>
  );
}
 
export default Login;