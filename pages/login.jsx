import React, { useEffect } from 'react';
// routing
import { useRouter } from 'next/router';
// context 
import useUser from '../context/hooks/useUser';
// componets
import TextInput from '../components/forms/inputs/TextInput';
import SubmitButton from '../components/forms/SubmitButton';
//styles
import styles from '../styles/forms.module.scss'
// form validation
import { useFormik} from 'formik';
import * as Yup from 'yup';
// Material 
import { TextField } from '@material-ui/core';


const Login = () => {
  // User context
  const userContext = useUser();
  const { userLogin, state : userState, isAuthenticated } = userContext; 
  const { isAuth, user, message } = userState;
  
  // next Router
  const router = useRouter();
  
  // FORMIK 
  const loginSchema = Yup.object({
    userName: Yup.string()
      .required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('El password es obligatorio')
  });
  const initialValues ={
    userName : '',
    password : ''
  }
  const formik = useFormik({
    initialValues,
    validationSchema : loginSchema,
    onSubmit : async values =>{
      // same shape as initial values
      console.log('SUBMIT')
      await userLogin(values);
    },
  });

  useEffect(() => {
    if( isAuth ){
      router.push({ pathname : '/', query : { company : user?.company } });
    }else{
      isAuthenticated();
    }
  }, [ isAuth ])
  return ( 

        <div className={ styles.login }>
          <div className={ styles.login2 }>
            <h1>INICIAR SESIÓN</h1>
              <form onSubmit= {formik.handleSubmit } >
                <TextInput 
                  styles= { styles.FormId }
                  type="text" 
                  name="userName" 
                  placeholder="Usuario" 
                 

                  value = { formik.values.userName }
                  onChange = { formik.handleChange }
                   error = { formik.touched.userName && Boolean( formik.errors.userName ) }
                  helperText={formik.touched.userName && formik.errors.userName}
                />
                <TextInput 
                  styles ={ styles.FormId } 
                  type="password" 
                  name="password" 
                  placeholder="Contraseña" 

                  value = { formik.values.password }
                  onChange = { formik.handleChange }
                  error = { formik.touched.password && Boolean( formik.errors.password ) }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <SubmitButton
                  styles = {  styles.btn }
                  textButton = 'INCIAR SESIÓN'
                /> 
               
              </form>
          </div>
        </div>
  );
}
 
export default Login;