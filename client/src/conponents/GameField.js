import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { img } from '../assets'
import styled from 'styled-components'
import ChampCard from './ChampCard';

const GameField = props => {
  const user = useSelector(state => state.user)
  console.log('user', user)
  const dispatch = useDispatch()

  const [stats, setStats] = useState(!user.str ? {
    str: 14,
    dex: 15,
    vit: 10,
    agil: 5,
    name: 'Sodiicc',
    class: 'mage',
    exp: 0,
    hp: 70
  } : user)
  const [enemyStats, setEnemy] = useState({
    str: 13,
    dex: 15,
    vit: 12,
    agil: 9,
    name: 'Enemy',
    class: 'warrior',
    exp: 0,
    hp: 100
  })
  useEffect(() => {
    dispatch({ type: 'SET_USER_CHAMP', payload: stats })
    dispatch({ type: 'SET_ENEMY_CHAMP', payload: enemyStats })
  }, [stats, enemyStats])

  const [toUserDmg, setToUserDmg] = useState(Math.round((enemyStats.str * (enemyStats.dex / stats.dex + enemyStats.agil / stats.agil)) * stats.hp / enemyStats.hp / 2))
  const [toEnemyDmg, setToEnemyDmg] = useState(Math.round((stats.str * (stats.dex / enemyStats.dex + stats.agil / enemyStats.agil)) * enemyStats.hp / stats.hp / 2))

  const crit = type => {
    let rand = Math.random()
    // setToEnemyDmg(100)
    console.log('rand', (0.15 + (-enemyStats.dex + stats.dex - enemyStats.agil + stats.agil) / 50))
    // if (type && rand < (0.95 + (enemyStats.dex - stats.dex + enemyStats.agil - stats.agil) / 50)) {
    //   setToEnemyDmg(Math.round(toEnemyDmg * (1.5 + enemyStats.agil / stats.agil / 3)))
    // } else if (!type && rand < (0.95 + (-enemyStats.dex + stats.dex - enemyStats.agil + stats.agil) / 50)) {
    //   setToUserDmg(Math.round(toUserDmg * (1.5 + stats.agil / enemyStats.agil / 3)))
    // }
  }

  const setKick = (e) => {
  console.log('e', e.target.checked)

  }


  return (
    <StyledField>
      <div className='game-wrapper'>
        <ChampCard isUser={true} click={crit} stats={stats} dmg={toUserDmg} />
        <div className='radio-wrapper'>
          <div>
            <input onClick={(e) => setKick(e)} type="radio" id="kick1"
              name="char" value="head" />
            <label htmlFor="kick1">head</label>
          </div>
          <div>
            <input onClick={(e) => setKick(e)} type="radio" id="kick2"
              name="char" value="body"  />
            <label htmlFor="kick2">body</label>
          </div>
          <div>
            <input onClick={(e) => setKick(e)} type="radio" id="kick3"
              name="char" value="legs" />
            <label htmlFor="kick3">legs</label>
          </div>
        </div>
        <ChampCard isUser={false} click={crit} stats={enemyStats} dmg={toEnemyDmg} />
      </div>
    </StyledField>
  )
}
export default GameField

const StyledField = styled.div`

.card-wrapper {
  display: flex;
}
.hero-logo {
height: 300px;
margin-top: 10px;

}
.hero-hp {
  display: inline-block;
  width: 10px;
  background-color: #f55;
  align-self: flex-end;
  margin-right: 10px
  
}
.img-wrapper {
  display: flex;
  position: relative;
}
.nickname {
  font-size: 22px;
}
.stats-wrapper {
  padding-top: 30px;
  width: 150px;
}
.game-wrapper {
  display: flex;
  justify-content: space-between;
}
.radio-wrapper {
  padding-top: 70px;
  label {
    padding: 6px;
    font-weight: 600;
  }
}
`
