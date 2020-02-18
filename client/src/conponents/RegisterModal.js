import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import {useDispatch} from 'react-redux'

const RegisterModal = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [password, setPass] = useState('')
  const [Confirmpassword, setConfirm] = useState('')
  const [errors, setErrors] = useState('')
  
  const resetFields = () => {
    setName('')
    setPass('')
    setErrors('')
    setConfirm('')
  }

  const onSubmit = () => {
    if(name.length > 2 && name.length < 15 && password.length > 5 && password === Confirmpassword) {
      axios.post("/users/createuser", {name, password})
        .then(res => {

          if(typeof res.data === 'string') {
            setErrors(res.data)
          }else{
            resetFields()
            dispatch({type: 'SET_USER_NAME', payload: res.data.name})
          }
          
          
        });
    }
  }

  return (
    <StyledModal>
      <p>registration</p>
      <div>
        <span>name</span><input placeholder='enter nickname 3-15 chars' onChange={e => setName(e.target.value)} value={name} />
      </div>
      <div>
        <span>password</span><input placeholder='enter pass more then 6 chars' type='password' onChange={e => setPass(e.target.value)} value={password} />
      </div>
      <div>
        <span> confirm password</span><input  placeholder='confirm password' type='password' onChange={e => setConfirm(e.target.value)} value={Confirmpassword} />
      </div>
  <p className='error-field'>{errors}</p>
      <button onClick={() => onSubmit()}>confirm</button>
    </StyledModal>
  )
}

export default RegisterModal

const StyledModal = styled.div`
text-align: right;
color: yellow;
input {
  height: 20px;
  display: inline-block;
  margin-left: 10px;
  ::placeholder {
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
  }
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