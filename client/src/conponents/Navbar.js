import React from 'react';
import {Link} from 'react-router-dom';
import RegisterModal from './RegisterModal';
import UserLogo from './UserLogo';
import LoginModal from './LoginModal';
import styled from 'styled-components'

export const Navbar = () => {
  return (
    <StyledNav className='navbar navbar-dark bg-dark'>
      <Link to='/' className='navbar-brand' >Battle Game</Link>
      <RegisterModal />
      <LoginModal />
      <UserLogo />
    </StyledNav>
  )
}

const StyledNav = styled.nav`
display: flex;
flex-direction: space-between;
min-height: 120px;
`