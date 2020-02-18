import React, { useState, useEffect } from 'react';
import { img } from '../assets'

const ChampCard = props => {
  let calculatedHp = Math.round(props.stats.hp * (1 + props.stats.vit/30))

  const [hp, setHp] = useState(calculatedHp)

  const isUser = () => {
    if(props.isUser){
      props.click(1)
    }else{
      props.click(0)      
    }
  }

  const handleClick = () => {
    let promise = new Promise(function(res,rej) {
      isUser()
        res('foo');

    })
    promise.then(() => setHp(s => s - props.dmg))
    
  }
  console.log('props.dmg', props.dmg)

  return (
    <div>
      <div className='card-wrapper'>
        <div className='img-wrapper'>
          <div>
            <div className="nickname">{props.stats.name}</div>
            <img className='hero-logo' onClick={() => handleClick()} src={img[props.stats.class]}></img>
          </div>
          <div className='hero-hp' onClick={() => setHp(s => s + 10)} style={{ height: `${hp < calculatedHp ? hp < 0 ? 5 : hp / calculatedHp * 300 : 300}px` }}></div>
        </div>
        <div className='stats-wrapper'>
          <p >Hp: {hp}/{calculatedHp}</p>
          <p>Str: {props.stats.str}</p>
          <p>Dex: {props.stats.dex}</p>
          <p>Vit: {props.stats.vit}</p>
          <p>Agil: {props.stats.agil}</p>
        </div>
      </div>
    </div>
  )
}

export default ChampCard
