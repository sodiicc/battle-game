import React, { useState } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom"

const Logout = props => {
  let history = useHistory()
console.log('ihistory', history)
  const dispatch = useDispatch()

  const onSubmit = () => {
    dispatch({type: 'LOGOUT_USER'})
    history.push("/")
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