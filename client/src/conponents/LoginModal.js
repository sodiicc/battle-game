import React, { useState } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import {useDispatch} from 'react-redux'

const LoginModal = props => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [password, setPass] = useState('')
  const [errors, setErrors] = useState('')

  const resetFields = () => {
    setName('')
    setPass('')
    setErrors('')
  }

  const onSubmit = () => {
    if(name.length > 2 && password.length) {
      axios.post("/users/login", {name, password})
        .then(res => {
          if(typeof res.data === 'string') {
            setErrors(res.data)
          }else{
            resetFields()
            console.log('res.data', res.data)
            dispatch({type: 'SET_USER', payload: res.data})
          }
        });
    }
  } 
  

  return (
    <StyledModal>
      <p>Log In</p>
      <div>
        <span>name</span><input onChange={e => setName(e.target.value)} value={name} />
      </div>
      <div>
        <span>password</span><input type='password' onChange={e => setPass(e.target.value)} value={password} />
      </div>
      <p className='error-field'>{errors}</p>
      <button onClick={() => onSubmit()}>Log In</button>
    </StyledModal>
  )
}

export default LoginModal

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
  background-color: yellow;
  outline: none;
  border: none;
  border-radius: 2px;
  font-weight: 600;
}
`