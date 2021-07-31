import { scheduleApi } from './';

const setTokenAuth = token => {
  if( token ) {
    scheduleApi.defaults.headers.common[ 'Authorization' ] = `${ token }`;
  }else{
    delete scheduleApi.defaults.headers.common[ 'Authorization' ];
  }
}

export default setTokenAuth;