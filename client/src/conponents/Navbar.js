import React from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import UserLogo from './UserLogo';
import LoginModal from './LoginModal';
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Logout from './Logout';

export const Navbar = () => {
  const user = useSelector(state => state.user.name)

  return (
    <StyledNav className='navbar navbar-dark bg-dark'>
      <Link to='/' className='navbar-brand' >Battle Game</Link>
      <UserLogo />
      {
        !user.length ?
          <div className='login-wrapper'>
            <RegisterModal />
            <LoginModal />
          </div>
          :
          <div className='login-wrapper'>
            <Logout />
          </div>
      }
    </StyledNav>
  )
}

const StyledNav = styled.nav`
display: flex;
flex-direction: space-between;
min-height: 120px;
padding: 0.5rem 3rem;

.login-wrapper {
  display: flex;

}
`