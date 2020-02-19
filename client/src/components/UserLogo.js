import React from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'

const UserLogo = () => {
const user = useSelector(state => state.user.name)

  return (
    <StyledLogo>
      {user}
    </StyledLogo>
  )
}

export default UserLogo

const StyledLogo = styled.div`
color: yellowgreen;
font-size: 50px;
`