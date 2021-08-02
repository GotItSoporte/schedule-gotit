import React, { useEffect } from 'react';
// routing
import { useRouter } from 'next/router';
// componets
import Header from '../components/layout/Header';
//styles
import styles from '../styles/forms.module.scss'
// form validation
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
// context 
import useUser from '../context/hooks/useUser';

 const loginSchema = Yup.object().shape({
   userName: Yup.string()
     .required('Required'),
   password: Yup.string()
     .min(5, 'La contraseña debe ser de 6 o mas caracteres!'),
 });

const Login = () => {
  // User context
  const userState = useUser();
  const { userLogin, state } = userState; 
  // next Router
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('got-it-token');
    if( token ){
      router.push( '/' );
    }
  }, [ state ])
  return ( 
    <>
        <div className={ styles.login }>
          <h1>Login</h1>
          <Formik
           initialValues={{
            userName: '',
            password: '',
           }}
           validationSchema={loginSchema}
           onSubmit={values => {
             // same shape as initial values
             userLogin(values);
           }}
          >
            {({ errors, touched }) => (
              <Form >
                <Field 
                  className= {styles.LoginId}
                  type="text" 
                  name="userName" 
                  placeholder="Usuario" 
                  required="required"  
                />
                {errors.userName && touched.userName ? (
                <div>{errors.userName}</div>
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