import React, { useEffect } from 'react';
// routing
import { useRouter } from 'next/router';
// context 
import useUser from '../context/hooks/useUser';
// componets
import ErrorForm from '../components/ErrorForm';
//styles
import styles from '../styles/forms.module.scss'
// form validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

 const loginSchema = Yup.object().shape({
   userName: Yup.string()
     .required('El nombre de ususario es obligatorio'),
   password: Yup.string().required('El password es obligarotio')
 });

const Login = () => {
  // User context
  const userContext = useUser();
  const { userLogin, state : userState, isAuthenticated } = userContext; 
  const { isAuth, user, message } = userState;

  // next Router
  const router = useRouter();

  useEffect(() => {
    console.log( 'refresh', { isAuth});
    if( isAuth ){
      router.push({ pathname : '/', query : { company : user?.company } });
    }else{
      isAuthenticated();
    }
  }, [ isAuth ])
  return ( 

        <div className={ styles.login }>
          <h1>Login</h1>
          <Formik
           initialValues={{
            userName: '',
            password: '',
           }}
           validationSchema={loginSchema}
           onSubmit={ async values => {
             // same shape as initial values
             console.log('SUBMIT')
             await userLogin(values);
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
                <ErrorForm 
                  classStyle= { styles.error_message } 
                  errorMessage = {errors.userName}
                />
                ) : null}

                <Field 
                  className={styles.LoginId} 
                  type="password" 
                  name="password" 
                  placeholder="Contraseña" 
                  required="required" 
                />
                {errors.password && touched.password ? (
                <ErrorForm 
                  classStyle= { styles.error_message } 
                  errorMessage = {errors.password}
                />
                ) : null}

                <button type="submit" className={ styles.btn }>Iniciar Sesión</button>
              </Form>
            )}
          </Formik>
        </div>
  );
}
 
export default Login;