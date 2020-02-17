import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux'
import styled from 'styled-components'



const Game = () => {
  const [exercises, setExercises] = useState([])

  let user = useSelector(state => state.user)
  console.log('user', user)

  useEffect(() => {
    axios.get('/heroes')
      .then(res => setExercises(res.data))
      .catch(err => console.log(err))
  }, [])

  // const deleteExercise = (id) => {
  //   axios.delete('/heroes/'+ id)
  //   setExercises(exercises.filter(el => el._id !== id))
  // }

  // const exerciseList = () => {
  //   return exercises.map(currentExercise => {
  //     return <Exercise key={currentExercise._id} exercise={currentExercise} deleteExercise={deleteExercise} />
  //   })
  // }


  let el = []
  let names = []
  for (let i = 0; i < exercises.length; i++) {
    for (let prop in exercises[i]) {
      el.push(<p key={prop + exercises[i].name}> {prop + " = " + exercises[i][prop]}</p>)
    }
    names.push(exercises[i].name)
  }
  console.log('exercises', exercises)
  return (
    <StyledGame>
      <div>
        <div>Choose your class</div>
        {<div className='wrapper'>
          {
            exercises.map(item => {
              return (
                <div key={item.name}>
                  <button name={item.name}>{item.name}</button>
                  <p>{item.hp}</p>
                  <p>{item.str}</p>
                  <p>{item.dex}</p>
                  <p>{item.vit}</p>
                  <p>{item.agil}</p>
                </div>
              )
            }
            )
          }

        </div>
        }
        {el}

      </div>
      {/* <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Decription</th>
            <th>Diration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table> */}
    </StyledGame>
  )
}

export default Game

const StyledGame = styled.div`
.wrapper {
  display: flex;
}
`