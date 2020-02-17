import React, { useState } from 'react';
import styled from 'styled-components'
import axios from 'axios'

const RegisterModal = () => {

  const [name, setName] = useState('')
  const [password, setPass] = useState('')

  const onSubmit = () => {
    if(name.length > 2 && password.length) {
      axios.post("/users/login", {name, password})
        .then(res => console.log(res.data));
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
      <button onClick={() => onSubmit()}>Log In</button>
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