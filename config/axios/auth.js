import { scheduleApi } from './';

const login = async ( body ) => {
  try {
    result = await scheduleApi.post('/users/login', body ).data;
    return result;
  } catch (error) {
    return error
  }
}

const tokenAuth = token => {
  if( token ) {
    clienteAxios.defaults.headers.common[ 'Authorization' ] = `${ token }`;
  }else{
    delete clienteAxios.defaults.headers.common[ 'Authorization' ];
  }
}

export {
  login,
}