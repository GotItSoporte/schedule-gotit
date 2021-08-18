import React, { useEffect } from 'react';
// next
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
//material ui 
import { Grid } from '@material-ui/core';
//components
import ProjectList from '../ProjectList';
// context
import useUser from '../../context/hooks/useUser';
// styles
import styles from '../../styles/header.module.scss';
// images
import logo from '../../public/Gotit Horizontal.png'

const Header = () => {
  // User context 
  const userContext = useUser();
  const { state : useState, isAuthenticated ,logout } = userContext;
  const  { isAuth, user } = useState;
  // next routing 
  const router = useRouter();
  // useEffect
  useEffect( ()=>{
    if( !isAuth ){
      isAuthenticated();
      if( !isAuth ){
        router.push( '/login' )
      }
    }
  }, [ useState ])

  const log_out = () =>{
    router.push({
      pathname : '/login',
    })
    logout();
  }

  const goToIndex = () => {
    router.push({
      pathname : '/',
      query : { company : user.company }
    })
  }
  return (  
    <header className = { styles.header }>
            <div id={ styles.logo } >
                <Image 
                  id= { styles.Logo_GotIt  } 
                  src={ logo } 
                  onClick = { () => goToIndex() }
                />
            </div>
            <div id= { styles.Container }>
                <ul id={styles.menu}>
                  <li>
                    <a onClick ={ log_out } href="#">Cerrar Sesión</a>
                  </li>
                    { !user?.role ?
                      <li>
                        <Link 
                          href = {{
                            pathname : '/new-req',
                            query :{ company : user?.company }
                          }}
                          >
                          <a>Nuevo requerimiento</a>
                        </Link>
                      </li>
                      : null
                    }
                  <li>
                    <Link 
                      href = {{
                        pathname : '/',
                        query :{ company : user?.company }
                      }}
                    >
                      <a>Proyectos</a>
                    </Link>
                  </li>
                </ul>
            </div>
    </header>
  );
}
 
export default Header;