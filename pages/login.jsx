import React, { useEffect } from 'react';
// routing
import { useRouter } from 'next/router';
// context 
import useUser from '../context/hooks/useUser';
// componets
import TextInput from '../components/forms/inputs/TextInput';
import SubmitButton from '../components/forms/SubmitButton';
// form validation
import { useFormik} from 'formik';
import * as Yup from 'yup';
// Material 
import { Grid } from '@material-ui/core';
//styles
import styles from '../styles/forms.module.scss'
import styled from 'styled-components';

const StyledLogin = styled( Grid )`
  height: 100vh;
  .login-container {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    padding: 30px 60px 60px 60px;
    background-color: #2E4054;
    border-radius: 10px;
      
    h1 {
      color: ${ props => props.theme.primary } ;
      letter-spacing: 1px;
      text-align: center;
    }
  }
`;

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

        <StyledLogin 
          container
          justifyContent = 'center'
          alignItems = 'center'

        >
          <div className = 'login-container' >
            <h1>INICIAR SESIÓN</h1>
              <form onSubmit= {formik.handleSubmit } autoComplete="off" >
                <TextInput  
                  type="text" 
                  name="userName" 
                  label="Usuario" 
                 
                  value = { formik.values.userName }
                  onChange = { formik.handleChange }
                   error = { formik.touched.userName && Boolean( formik.errors.userName ) }
                  helperText={formik.touched.userName && formik.errors.userName}
                />
                <TextInput 
                  type="password" 
                  name="password" 
                  label="Contraseña" 

                  value = { formik.values.password }
                  onChange = { formik.handleChange }
                  error = { formik.touched.password && Boolean( formik.errors.password ) }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <SubmitButton
                  textButton = 'INCIAR seSIÓN'
                /> 
               
              </form>
          </div>
        </StyledLogin>
  );
}
 
export default Login;