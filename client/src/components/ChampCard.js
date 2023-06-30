import React from "react";
import { img_all } from "../assets";
import { img_weapons } from "../assets";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ChampCard = props => {

  return (
    <div>
      <div className="card-wrapper">
        <div className="img-wrapper">
          {props.exp ? (
            <div
              className="hero-exp"
              style={{
                height: `${props.exp < props.maxExp
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
              height: `${props.lowHp < props.hp
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
                <div key={`${el.name + index}`} data-for={el.name + index}
                  data-type="info"
                  data-tip={`${el.name}<br />Level: ${el.lvl}<br />Rarity: ${el.rar}<br />Hp: ${el.hp}<br />Str: ${el.str}<br />Dex: ${el.dex}<br />Vit: ${el.vit}<br />Agil: ${el.agil}`} className="img-wrapper">
                  <img
                    onClick={() => props.onEquip(index)}
                    className={el.equipped ? `equipped ${el.rare}` : el.rare}
                    src={img_weapons[el.img]}
                    alt="img"
                    data-tooltip-id={el.name + index}

                  ></img>
                  <ReactTooltip
                    backgroundColor='#def'
                    className={el.rar} multiline={true} id={el.name + index}>
                    <div className={el.rar}>
                      <p>{el.name}</p>
                      <p>Rarity: {el.rar}</p>
                      <p>Str: {el.str}</p>
                      <p>Dex: {el.dex}</p>
                      <p>Vit: {el.vit}</p>
                      <p>Agil: {el.agil}</p>
                      <p>Lvl: {el.lvl}</p>
                    </div>
                  </ReactTooltip>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {props.chances ? (
        <div>
          <p>crit chance: {props.chances[0].toFixed(2)} %</p>
          {/* <p>crit power: {props.chances[3].toFixed(2)} %</p> */}
          <p>block: {props.chances[1].toFixed(2)} %</p>
          <p>attack: {props.chances[2].toFixed(2)} HP</p>
        </div>
      ) : null}
    </div>
  );
};

export default ChampCard;
