import { scheduleApi } from './';

const setTokenAuth = token => {
  if( token ) {
    scheduleApi.defaults.headers.common[ 'Authorization' ] = `${ token }`;
    console.log(' hay token ', { token } )
  }else{
    delete scheduleApi.defaults.headers.common[ 'Authorization' ];
    console.log(' NO hay token ', { token } )
  }
}

export default setTokenAuth;