import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ChampCard from "./ChampCard";
import axios from "axios";
import ChoseEnemy from "./ChoseEnemy";
import {
  calculateCrit,
  calculateBlock,
  calculateAttack
} from "./_additionalCimponents/calculateDmg";

const GameField = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [stats] = useState(
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
  const [hp,setHp] = useState(Math.round(stats.hp * (1 + stats.vit / 30)));
  const [enemyHp, setEnemyHp] = useState(0);
  const [lowHp, setLowHp] = useState(
    Math.round(stats.hp * (1 + stats.vit / 30))
    );
    const [lowEnemyHp, setLowEnemyHp] = useState(30);
    const [enemyChamp, setEnemyChamp] = useState(false);
    const [enemyDiff, setEnemyDiff] = useState([0, 0, 0]);
    const [toUserDmg, setToUserDmg] = useState(0)  
    const [toEnemyDmg, setToEnemyDmg] = useState(0)
    const [showUserDmg, setShowUserDmg] = useState('');
    const [showEnemyDmg, setShowEnemyDmg] = useState('');
    const [result, setResult] = useState(null);
    
  useEffect(() => {
    dispatch({ type: "SET_USER_CHAMP", payload: stats });
    dispatch({ type: "SET_ENEMY_CHAMP", payload: enemyStats });
  }, [stats, enemyStats, dispatch]);

  useEffect(() => {
    axios.get("/enemies").then(res => setAllEnemy(res.data));
  }, []);

  useEffect(() => {
    setToEnemyDmg(
      Math.round(
          calculateCrit(
            fightType.indexOf(true),
            stats.dex,
            stats.agil,
            enemyStats.dex,
            enemyStats.agil
          )[0] *
          calculateAttack(stats.lvl, stats.str, enemyStats.str, enemyStats.vit)
      ) * calculateBlock(fightType.indexOf(true), enemyStats.dex, stats.str)[0]
    );
    setToUserDmg(
      Math.round(
          calculateCrit(
            Math.floor(Math.random() * 3),
            enemyStats.dex,
            enemyStats.agil,
            stats.dex,
            stats.agil
          )[0] *
          calculateAttack(enemyStats.lvl, enemyStats.str, stats.str, stats.vit)
      ) * calculateBlock(Math.floor(Math.random() * fightType.length), stats.dex, enemyStats.str )[0]
    );
  }, [fightType]);

  useEffect(() => {
    if(lowEnemyHp <= 0 && lowHp > 0){
      setResult('YOU WIN')
      setShowUserDmg('')
      setShowEnemyDmg('')
    }else if(lowEnemyHp >= 0 && lowHp < 0){
      setResult('YOU LOSE')
      setShowUserDmg('')
      setShowEnemyDmg('')      
    }else if(lowEnemyHp <= 0 && lowHp <= 0){
      setResult('DROW') 
      setShowUserDmg('')
      setShowEnemyDmg('')
    }
  },[lowEnemyHp, lowHp])

  

  const generateFight = () => {
    setLowHp(hp => hp - toUserDmg);
    setLowEnemyHp(hp => hp - toEnemyDmg);
    setShowEnemyDmg(toEnemyDmg)
    setShowUserDmg(toUserDmg)
  };

  const fightBtn = () => {
    if (fightType.includes(true)) {
      generateFight();
      setFight([0, 0, 0]);
    }
  };

  const onChangeDiff = data => {
    let diff = [0, 0, 0];
    diff[data] = 1;
    setEnemyDiff(diff);
    let rand = Math.random();
    let lvlData = allEnemy.filter(el => el.lvl === stats.lvl + diff.indexOf(1));
    let enemy = lvlData[Math.floor(rand * lvlData.length)];
    setEnemy(enemy);
    let hp = Math.round(enemy.hp * (1 + enemy.vit / 30));    
    setEnemyHp(hp);
    setLowEnemyHp(hp);
  };

  const confirmDiff = () => {
    setHp( Math.round(stats.hp * (1 + stats.vit / 30)))
    setLowEnemyHp(Math.round(enemyStats.hp * (1 + enemyStats.vit / 30)))
    setEnemyHp(Math.round(enemyStats.hp * (1 + enemyStats.vit / 30)))
    setLowHp(Math.round(stats.hp * (1 + stats.vit / 30)))
    setEnemyChamp(true);
    setResult(null);
    setEnemyDiff([0, 0, 0])
  };

  const onSetType = set => {
    setFight(set);
  };

  return (
    <StyledField>
      <div className="game-wrapper">
        <ChampCard stats={stats} showDmg={showUserDmg} dmg={toUserDmg} hp={hp} lowHp={lowHp} />
        {enemyChamp && !result ? (
          <div className="radio-wrapper">
            <div>
              <input
                type="radio"
                id="kick1"
                name="char"
                value="head"
                checked={!!fightType[0]}
                onChange={() => onSetType([!fightType[0], 0, 0])}
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
                onChange={() => onSetType([0, !fightType[1], 0])}
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
                onChange={() => onSetType([0, 0, !fightType[2]])}
              />
              <label htmlFor="kick3">legs</label>
            </div>
            <button onClick={() => fightBtn()}>fight</button>
          </div>
        ) : null}
        {
         result ? <div>{result}</div> :null
        }
        {enemyChamp && !result ? (
          <ChampCard
            stats={enemyStats}
            dmg={toEnemyDmg}
            hp={enemyHp}
            lowHp={lowEnemyHp}
            showDmg={showEnemyDmg}
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
