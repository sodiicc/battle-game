import React, { useState } from "react";
import { img_all } from "../assets";
import { img_weapons } from "../assets";

const ChampCard = props => {
  const [hoverData, setData] = useState(null);

  const onHover = el => {
    setData(el);
  };
  const onBlur = el => {
    setData(null);
  };
  // console.log('setData', props.chances)

  return (
    <div>
      <div className="card-wrapper">
        <div className="img-wrapper">
          {props.exp ? (
            <div
              className="hero-exp"
              style={{
                height: `${
                  props.exp < props.maxExp
                    ? props.exp <= 0
                      ? 5
                      : (props.exp / props.maxExp) * 300
                    : 300
                }px`
              }}
            ></div>
          ) : null}
          <div>
            <div className="nickname">
              {props.stats.name}
              {`(${props.stats.lvl})`}
              {"-" + props.showDmg}
            </div>
            <img
              className="hero-logo"
              src={img_all[props.stats.class]}
              alt="img"
            ></img>
          </div>
          <div
            className="hero-hp"
            style={{
              height: `${
                props.lowHp < props.hp
                  ? props.lowHp < 0
                    ? 5
                    : (props.lowHp / props.hp) * 300
                  : 300
              }px`
            }}
          ></div>
        </div>
        <div className="stats-wrapper">
          <p>
            Hp: {props.lowHp}/{props.hp}
          </p>
          <div>
            <span>Str: {props.stats.str}</span>
            {props.stats.stats ? (
              <span onClick={() => props.levelUp("str")} className="add-stats">
                +
              </span>
            ) : null}
          </div>
          <div>
            <span>Dex: {props.stats.dex}</span>
            {props.stats.stats ? (
              <span onClick={() => props.levelUp("dex")} className="add-stats">
                +
              </span>
            ) : null}
          </div>
          <div>
            <span>Vit: {props.stats.vit}</span>
            {props.stats.stats ? (
              <span onClick={() => props.levelUp("vit")} className="add-stats">
                +
              </span>
            ) : null}
          </div>
          <div>
            <span>Agil: {props.stats.agil}</span>
            {props.stats.stats ? (
              <span onClick={() => props.levelUp("agil")} className="add-stats">
                +
              </span>
            ) : null}                
          </div>
          <p>
            Exp: {props.exp}/{props.maxExp}
          </p>
          <p>Free stats: {props.stats.stats}</p>
        </div>
      </div>
      {props.stats.items ? (
        <div className="drop-box">
          <div>
            {props.stats.items.map((el, index) => {
              return (
                <div key={`${el.name + index}`} className="img-wrapper">
                  <img
                    onClick={() => props.onEquip(index)}
                    onMouseEnter={() => onHover(el)}
                    onMouseLeave={() => onBlur(el)}
                    className={el.equipped ? `equipped ${el.rare}` : el.rare}
                    src={img_weapons[el.img]}
                    alt="img"
                  ></img>
                </div>
              );
            })}
            <div>
              {hoverData ? (
                <div className={hoverData.rar}>
                  <p>{hoverData.name}</p>
                  <p>Rarity: {hoverData.rar}</p>
                  <p>Str: {hoverData.str}</p>
                  <p>Dex: {hoverData.dex}</p>
                  <p>Vit: {hoverData.vit}</p>
                  <p>Agil: {hoverData.agil}</p>
                  <p>Lvl: {hoverData.lvl}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {props.chances ? (
                  <div>
                    <p>crit chance: {props.chances[0].toFixed(2)} %</p>
                    <p>crit power: {props.chances[3].toFixed(2)} %</p>
                    <p>block: {props.chances[1].toFixed(2)} %</p>
                    <p>attack: {props.chances[2].toFixed(2)} HP</p>
                  </div>
                ) : null}
    </div>
  );
};

export default ChampCard;
