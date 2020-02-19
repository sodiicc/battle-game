import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { img_all } from "../assets";
import styled from "styled-components";
import ChampCard from "./ChampCard";
import axios from "axios";
import ChoseEnemy from "./ChoseEnemy";

const GameField = props => {
  const user = useSelector(state => state.user);
  console.log("user", user);
  const dispatch = useDispatch();

  const [stats, setStats] = useState(
    !user.str
      ? {
          str: 14,
          dex: 15,
          vit: 10,
          agil: 5,
          name: "Sodiicc",
          class: "mage",
          exp: 0,
          hp: 70,
          lvl: 1
        }
      : user
  );
  const [enemyStats, setEnemy] = useState({
    str: 13,
    dex: 15,
    vit: 12,
    agil: 9,
    name: "Enemy",
    class: "warrior",
    exp: 0,
    hp: 120
  });

  const [allEnemy, setAllEnemy] = useState([]);
  const [fightType, setFight] = useState([0, 0, 0]);
  const [hp, setHp] = useState(Math.round(stats.hp * (1 + stats.vit / 30)));
  const [enemyHp, setEnemyHp] = useState(0);
  const [lowHp, setLowHp] = useState(Math.round(stats.hp * (1 + stats.vit / 30)));
  const [lowEnemyHp, setLowEnemyHp] = useState(30);
  const [enemyChamp, setEnemyChamp] = useState(false);
  const [enemyDiff, setEnemyDiff] = useState([0, 0, 0]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    dispatch({ type: "SET_USER_CHAMP", payload: stats });
    dispatch({ type: "SET_ENEMY_CHAMP", payload: enemyStats });
  }, [stats, enemyStats]);

  useEffect(() => {
    axios
      .get("/enemies")
      .then(res => setAllEnemy(res.data))
  }, []);

  const [toUserDmg, setToUserDmg] = useState(
    Math.round(
      (enemyStats.str * (enemyStats.dex / stats.dex + enemyStats.agil / stats.agil)) / 2
    )
  );
  const [toEnemyDmg, setToEnemyDmg] = useState(
    Math.round(
      (stats.str * (stats.dex / enemyStats.dex + stats.agil / enemyStats.agil)) / 2
    )
  );

  const crit = type => {
    let rand = Math.random();
    // setToEnemyDmg(100)
    console.log(
      "rand",
      0.15 + (-enemyStats.dex + stats.dex - enemyStats.agil + stats.agil) / 50
    );
    // if (type && rand < (0.95 + (enemyStats.dex - stats.dex + enemyStats.agil - stats.agil) / 50)) {
    //   setToEnemyDmg(Math.round(toEnemyDmg * (1.5 + enemyStats.agil / stats.agil / 3)))
    // } else if (!type && rand < (0.95 + (-enemyStats.dex + stats.dex - enemyStats.agil + stats.agil) / 50)) {
    //   setToUserDmg(Math.round(toUserDmg * (1.5 + stats.agil / enemyStats.agil / 3)))
    // }
  };

  const setKick = e => {
    console.log("e", e.target.checked);
  };

  const generateFight = () => {
    setLowHp(hp => hp - toUserDmg);
    setLowEnemyHp(hp => hp - toEnemyDmg);
  };

  const fightBtn = () => {
    generateFight();
    setFight([0, 0, 0]);
  };

  const onChangeDiff = data => {
    let diff = [0, 0, 0];
    diff[data] = 1;
    setEnemyDiff(diff);
    let rand = Math.random()
    let lvlData = allEnemy.filter(el => el.lvl === stats.lvl+diff.indexOf(1))
    let enemy = lvlData[Math.floor(rand*lvlData.length)]
    console.log('enemy', enemy, allEnemy, lvlData)
    setEnemy(enemy)
    let hp = Math.round(enemy.hp * (1 + enemy.vit / 30))
    setEnemyHp(hp)
    setLowEnemyHp(hp)
  };
  const confirmDiff = () => {    
    setEnemyChamp(true);
    setResult(null)
  };

  return (
    <StyledField>
      <div className="game-wrapper">
        <ChampCard
          isUser={true}
          click={crit}
          stats={stats}
          dmg={toUserDmg}
          hp={hp}
          lowHp={lowHp}
        />
        {enemyChamp ? (
          <div className="radio-wrapper">
            <div>
              <input
                type="radio"
                id="kick1"
                name="char"
                value="head"
                checked={!!fightType[0]}
                onChange={() => setFight([!fightType[0], 0, 0])}
              />
              <label htmlFor="kick1">head</label>
            </div>
            <div>
              <input
                type="radio"
                id="kick2"
                name="char"
                value="body"
                checked={!!fightType[1]}
                onChange={() => setFight([0, !fightType[1], 0])}
              />
              <label htmlFor="kick2">body</label>
            </div>
            <div>
              <input
                type="radio"
                id="kick3"
                name="char"
                value="legs"
                checked={!!fightType[2]}
                onChange={() => setFight([0, 0, !fightType[2]])}
              />
              <label htmlFor="kick3">legs</label>
            </div>
            <button onClick={() => fightBtn()}>fight</button>
          </div>
        ) : null}
        {enemyChamp && !result ? (
          <ChampCard
            isUser={false}
            click={crit}
            stats={enemyStats}
            dmg={toEnemyDmg}
            hp={enemyHp}
            lowHp={lowEnemyHp}
          />
        ) : (
          <ChoseEnemy
            confirm={confirmDiff}
            diff={enemyDiff}
            changeDiff={onChangeDiff}
          />
        )}
      </div>
    </StyledField>
  );
};
export default GameField;

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
    margin-right: 10px;
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
  .dificulty-logo {
    height: 70px;
    /* margin: 20px 10px; */
  }
`;
