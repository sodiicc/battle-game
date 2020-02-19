import React, { useState, useEffect } from 'react';
import { img_all } from '../assets'

const ChampCard = props => {
  

  const [hp, setCalculatedHp] = useState(props.lowHp)

  const isUser = () => {
    if(props.isUser){
      props.click(1)
    }else{
      props.click(0)      
    }
  }

  
  return (
    <div>
      <div className='card-wrapper'>
        <div className='img-wrapper'>
          <div>
  <div className="nickname">{props.stats.name}{`(${props.stats.lvl})`}</div>
            <img className='hero-logo' src={img_all[props.stats.class]}></img>
          </div>
          <div className='hero-hp'  style={{ height: `${props.lowHp < props.hp ? props.lowHp < 0 ? 5 : props.lowHp / props.hp * 300 : 300}px` }}></div>
        </div>
        <div className='stats-wrapper'>
          <p >Hp: {props.lowHp}/{props.hp}</p>
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