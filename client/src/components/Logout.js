import React from 'react';
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"

const Logout = props => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = () => {
    dispatch({type: 'LOGOUT_USER'})
    navigate("/")
    }    

  return (
    <StyledModal>
      <button onClick={() => onSubmit()}>Log out</button>
    </StyledModal>
  )
}

export default Logout

const StyledModal = styled.div`
text-align: right;
color: yellow;
padding: 10px 20px;
input {
  height: 20px;
  display: inline-block;
  margin-left: 10px;
}
p {
  margin: 0;
}
button {
  background-color: pink;
  outline: none;
  border: none;
  border-radius: 2px;
  font-weight: 600;
}
`