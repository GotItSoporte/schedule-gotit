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
// images
import logo from '../../public/Gotit Horizontal.png'
// styles
import styled from 'styled-components';

const SyledHeader = styled.header`
  display: flex;
	background-color: #e2e2e2;
	text-transform: uppercase;
`;

const StyledLogo = styled.div`
  flex: 1;
	margin-top: 20px;
	margin-left: 20px;

	& :hover{
		cursor: pointer;
	} 
  div {
		&:first-child {
      width: 50% !important;
      min-width: 80px;
		}
    div {
      &:first-child {
        width: 100% !important;
        height: 100% !important;
      }
    }
	}
`;

const StyledMenu = styled.ul`
  flex: 3;
	margin-top: 20px;
	margin-right: 20px;
	list-style: none;
	>li {
		float: right;
		position: relative;
		border-right: 3px solid #e2e2e2;
		perspective: 1000px;
		&:first-child {
			border-left: 1px solid #e2e2e2;
		}
		&:hover {
			>a {
				color: $primary;
				text-shadow: none;
			}
		}
	}
	a {
		z-index: 10;
		padding: 13px 30px 13px 13px;
		text-decoration: none;
		color: rgba(75,75,75,1);
		line-height: 1;
		font-weight: 600;
		font-size: 18px;
	}
`;

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
    <SyledHeader >
      <StyledLogo id= 'logo' >
          <Image 
            src={ logo } 
            onClick = { () => goToIndex() }
          />
      </StyledLogo>
      
      
          <StyledMenu >
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
          </StyledMenu>

    </SyledHeader>
  );
}
 
export default Header;