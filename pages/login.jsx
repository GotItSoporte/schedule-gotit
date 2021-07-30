import React from 'react';
// componets
import Header from '../components/layout/Header';
//styles
import styles from '../styles/forms.module.scss'
// form validation
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';

 const loginSchema = Yup.object().shape({
   user: Yup.string()
     .required('Required'),
   password: Yup.string()
     .min(5, 'La contraseña debe ser de 6 o mas caracteres!'),
 });

const Login = () => {
  const login =( values )=>{
    console.log(  'login...'  );
    console.log(  values  );
  }
  return ( 
    <>
      <Header/>
        <div className={ styles.login }>
          <h1>Login</h1>
          <Formik
           initialValues={{
            user: '',
            password: '',
           }}
           validationSchema={loginSchema}
           onSubmit={values => {
             // same shape as initial values
             login(values);
           }}
          >
            {({ errors, touched }) => (
              <Form >
                <Field 
                  className= {styles.LoginId}
                  type="text" 
                  name="user" 
                  placeholder="Usuario" 
                  required="required"  
                />
                {errors.user && touched.usr ? (
                <div>{errors.user}</div>
                ) : null}

                <Field 
                  className={styles.LoginId} 
                  type="password" 
                  name="password" 
                  placeholder="Contraseña" 
                  required="required" 
                />
                {errors.password && touched.password ? (
                <div>{errors.password}</div>
                ) : null}

                <button type="submit" className={ styles.btn }>Iniciar Sesión</button>
              </Form>
            )}
     </Formik>
        </div>
    </>
  );
}
 
export default Login;