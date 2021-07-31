import { scheduleApi } from './';

const setTokenAuth = token => {
  if( token ) {
    clienteAxios.defaults.headers.common[ 'Authorization' ] = `${ token }`;
  }else{
    delete clienteAxios.defaults.headers.common[ 'Authorization' ];
  }
}

export default setTokenAuth;