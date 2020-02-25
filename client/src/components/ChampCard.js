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
          <p>Str: {props.stats.str}</p>
          <p>Dex: {props.stats.dex}</p>
          <p>Vit: {props.stats.vit}</p>
          <p>Agil: {props.stats.agil}</p>
          <p>Exp: {props.exp}</p>
        </div>
      </div>
      {props.stats.items ? (
        <div className="drop-box">
          <div>
            {props.stats.items.map((el, index) => {
              return (
                <div className="img-wrapper">
                  <img
                    onClick={() => props.onEquip(index)}
                    onMouseEnter={() => onHover(el)}
                    onMouseLeave={() => onBlur(el)}
                    className={el.equipped ? "equipped" : ""}
                    key={`${el.name + index}`}
                    src={img_weapons[el.img]}
                    alt='img'
                  ></img>
                </div>
              );
            })}
            <div>
              {hoverData ? (
                <div>
                  <p>{hoverData.name}</p>
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
    </div>
  );
};

export default ChampCard;
