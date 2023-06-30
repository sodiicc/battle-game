import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ChampCard from "./ChampCard";
import ChoseEnemy from "./ChoseEnemy";
import {
  calculateCrit,
  calculateBlock,
  calculateAttack
} from "./_additionalCimponents/calculateDmg";
import { calcRandomStats } from "./_additionalCimponents/randomStats";
import { img_weapons } from "../assets";
import {Tooltip as ReactTooltip} from "react-tooltip";
import { api } from "../api";
// import { items } from "./_additionalCimponents/items";

const GameField = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [userStats, setUser] = useState(
    !user.str && !JSON.parse(localStorage.getItem("userChamp")).str
      ? {
          str: 12,
          dex: 3,
          vit: 17,
          agil: 5,
          name: "Sodiicc",
          class: "ogr",
          hp: 120,
          lvl: 1,
          exp: 0,
          items: [],
          stats: 3
        }
      : JSON.parse(localStorage.getItem("userChamp"))
  );
  const [enemyStats, setEnemy] = useState({
    str: 13,
    dex: 15,
    vit: 12,
    agil: 9,
    name: "Enemy",
    class: "warrior",
    exp: 0,
    hp: 120,
    lvl: 1,
    stats: 0
  });

  const [calculatedStats, setCalculatedStats] = useState(userStats);
  const [allItems, setAllItems] = useState([]);
  const [allEnemy, setAllEnemy] = useState([]);
  const [fightType, setFight] = useState([0, 0, 0]);
  const [hp, setHp] = useState(
    Math.round(calculatedStats.hp * (1 + calculatedStats.vit / 30))
  );
  const [enemyHp, setEnemyHp] = useState(0);
  const [lowHp, setLowHp] = useState(
    Math.round(calculatedStats.hp * (1 + calculatedStats.vit / 30))
  );
  const [lowEnemyHp, setLowEnemyHp] = useState(30);
  const [enemyChamp, setEnemyChamp] = useState(false);
  const [enemyDiff, setEnemyDiff] = useState([0, 0, 0, 0, 0]);
  const [toUserDmg, setToUserDmg] = useState(0);
  const [toEnemyDmg, setToEnemyDmg] = useState(0);
  const [showUserDmg, setShowUserDmg] = useState("");
  const [showEnemyDmg, setShowEnemyDmg] = useState("");
  const [result, setResult] = useState(null);
  const [okResult, setOkResult] = useState(false);
  const [drop, setDrop] = useState(null);
  const [exp, setExp] = useState(0);
  const [maxExp, setMaxExp] = useState(100);
  const [usrDMG, setUsrDMG] = useState([0, 0, 0, 0]);
  const [enemyDMG, setEnemyDMG] = useState([0, 0, 0, 0]);
  const [dropChance, setDropChance] = useState(1.5);
  const [userAttack, setUserAttack] = useState(0);
  const [isCrit, setIsCrit] = useState(0);
  const [crit, setCrit] = useState("");
  const [isBlock, setIsBlock] = useState(0);

  useEffect(() => {
    dispatch({ type: "SET_USER_CHAMP", payload: userStats });
    api.post("/users/update", userStats);
    setMaxExp(userStats.lvl * 250);
  }, [userStats]);

  useEffect(() => {
    dispatch({ type: "SET_ENEMY_CHAMP", payload: enemyStats });
  }, [enemyStats, dispatch]);

  useEffect(() => {
    if (user.userChamp) {
      setUser(user.userChamp);
      if (user.userChamp) setCalcStats(user.userChamp);
    }
  }, [user.userChamp]);
  useEffect(() => {
    if (userStats.items.length) setCalcStats(userStats);
  }, [userStats.items]);

  const setCalcStats = stats => {
    let items = stats.items;
    let userCopy = JSON.parse(JSON.stringify(stats));
    if (items.length) {
      let item = items.find(el => el.equipped === true) || items[0];
      userCopy.hp += item.hp;
      userCopy.str += item.str;
      userCopy.dex += item.dex;
      userCopy.vit += item.vit;
      userCopy.agil += item.agil;
      setCalculatedStats(userCopy);
    }
  };

  useEffect(() => {
    api.get("/enemies").then(res => setAllEnemy(res.data));
    api.get("/items").then(res => setAllItems(res.data));
  }, []);

  const calcUsrDmg = () => {
    let calcCrit = calculateCrit(
      fightType.indexOf(true),
      calculatedStats.dex,
      calculatedStats.agil,
      enemyStats.dex,
      enemyStats.agil,
      userStats.class
    );
    return [
      calcCrit[2] * 100,
      calculateBlock(
        fightType.indexOf(true),
        calculatedStats.dex,
        enemyStats.str,
        userStats.class
      )[2] * 100,
      calculateAttack(
        calculatedStats.lvl,
        calculatedStats.str,
        enemyStats.str,
        enemyStats.vit,
        userStats.class
      ),
      calculateCrit(
        fightType.indexOf(true),
        calculatedStats.dex,
        calculatedStats.agil,
        enemyStats.dex,
        enemyStats.agil,
        userStats.class
      )[3] * 100
    ];
  };

  const calcUsrDmgWithCrit = () => {
    let usrCrit = calculateCrit(
      fightType.indexOf(true),
      calculatedStats.dex,
      calculatedStats.agil,
      enemyStats.dex,
      enemyStats.agil,
      userStats.class
    );

    let usrBlock = calculateBlock(
      fightType.indexOf(true),
      enemyStats.dex,
      calculatedStats.str,
      userStats.class
    );

    let attack = calculateAttack(
      calculatedStats.lvl,
      calculatedStats.str,
      enemyStats.str,
      enemyStats.vit,
      userStats.class
    );

    setUserAttack(attack);
    return Math.round(usrCrit[0] * attack) * usrBlock[0];
  };

  useEffect(() => {
    setUsrDMG(calcUsrDmg());
    setEnemyDMG([
      calculateCrit(
        Math.floor(Math.random() * 3),
        enemyStats.dex,
        enemyStats.agil,
        calculatedStats.dex,
        calculatedStats.agil,
        enemyStats.class
      )[2] * 100,
      calculateBlock(
        Math.floor(Math.random() * fightType.length),
        enemyStats.dex,
        calculatedStats.str,
        enemyStats.class
      )[2] * 100,
      calculateAttack(
        enemyStats.lvl,
        enemyStats.str,
        calculatedStats.str,
        calculatedStats.vit,
        enemyStats.class
      ),
      calculateCrit(
        Math.floor(Math.random() * 3),
        enemyStats.dex,
        enemyStats.agil,
        calculatedStats.dex,
        calculatedStats.agil,
        enemyStats.class
      )[3] * 100
    ]);

    setToEnemyDmg(calcUsrDmgWithCrit());
    setToUserDmg(
      Math.round(
        calculateCrit(
          Math.floor(Math.random() * 3),
          enemyStats.dex,
          enemyStats.agil,
          calculatedStats.dex,
          calculatedStats.agil,
          enemyStats.class
        )[0] *
          calculateAttack(
            enemyStats.lvl,
            enemyStats.str,
            calculatedStats.str,
            calculatedStats.vit,
            enemyStats.class
          )
      ) *
        calculateBlock(
          Math.floor(Math.random() * fightType.length),
          calculatedStats.dex,
          enemyStats.str,
          enemyStats.class
        )[0]
    );
  }, [
    fightType,
    enemyStats.agil,
    enemyStats.dex,
    enemyStats.lvl,
    enemyStats.str,
    enemyStats.vit,
    calculatedStats.agil,
    calculatedStats.dex,
    calculatedStats.lvl,
    calculatedStats.str,
    calculatedStats.vit
  ]);

  const findItem = rar => {
    return allItems.filter(el => el.lvl === enemyStats.lvl && el.rar === rar)[
      Math.floor(
        Math.random() *
          allItems.filter(el => el.lvl === enemyStats.lvl && el.rar === rar)
            .length
      )
    ];
  };

  const increaseDrop = () => {
    if (enemyStats.lvl > userStats.lvl)
      return enemyStats.lvl - userStats.lvl + 1;
    return 1;
  };

  useEffect(() => {
    let rand = Math.random();
    if (showUserDmg !== "") {
      if (lowEnemyHp <= 0 && lowHp > 0) {
        setRes("YOU WIN");
        setExp(Math.round(enemyStats.lvl * 10 * (1 + 2 * (1 - lowHp / hp))));
        if (rand < 0.001 * increaseDrop() * dropChance)
          setDrop(findItem("epic"));
        else if (rand < 0.003 * increaseDrop() * dropChance)
          setDrop(findItem("legendary"));
        else if (rand < 0.008 * increaseDrop() * dropChance)
          setDrop(findItem("rare"));
        else if (rand < 0.015 * increaseDrop() * dropChance)
          setDrop(findItem("magic"));
        else if (rand < 0.035 * increaseDrop() * dropChance)
          setDrop(findItem("uncommon"));
        else if (rand < 0.09 * increaseDrop() * dropChance)
          setDrop(findItem("normal"));
        else if (rand < 0.2 * increaseDrop() * dropChance)
          setDrop(findItem("common"));
      } else if (lowEnemyHp > 0 && lowHp <= 0) {
        setRes("YOU LOSE");
        setExp(Math.round(enemyStats.lvl * 2));
      } else if (lowEnemyHp <= 0 && lowHp <= 0) {
        setRes("DROW");
        setExp(Math.round(enemyStats.lvl * 5));
      }
    }
  }, [lowEnemyHp, lowHp, allItems, enemyStats.lvl, hp]);

  const setRes = res => {
    setResult(res);
    setOkResult(true);
  };

  const generateFight = () => {
    setLowHp(hp => hp - toUserDmg);
    setLowEnemyHp(hp => hp - toEnemyDmg);
    setShowEnemyDmg(toEnemyDmg);
    setShowUserDmg(toUserDmg);
    setCrit(`crit: ${toEnemyDmg}`);
    if (toEnemyDmg > userAttack * 1.5) setIsCrit(1);
    else setIsCrit(0);
    if (toUserDmg == 0) setIsBlock(1)
    else setIsBlock(0)
  };

  const fightBtn = () => {
    if (fightType.includes(true)) {
      generateFight();
      setFight([0, 0, 0]);
    }
  };

  const onChangeDiff = (data, lvl) => {
    console.log("data, lvl", data, lvl);
    let diff = [0, 0, 0, 0, 0];
    diff[data] = 1;
    setEnemyDiff(diff);
    let rand = Math.random();
    let lvlData;
    if (data === 3) {
      lvlData = allEnemy.filter(
        el => el.lvl === userStats.lvl + 3 && el.class === "boss"
      );
    } else if (data === 4) {
      lvlData = allEnemy.filter(el => el.lvl === lvl);
    } else {
      lvlData = allEnemy.filter(
        el => el.lvl === userStats.lvl + diff.indexOf(1)
      );
    }
    let enemy = lvlData[Math.floor(rand * lvlData.length)];
    enemy = calcRandomStats(enemy);
    setEnemy(enemy);
    let hp = Math.round(enemy.hp * (1 + enemy.vit / 30));
    setEnemyHp(hp);
    setLowEnemyHp(hp);
    setCrit("");
  };

  const confirmDiff = () => {
    setHp(Math.round(calculatedStats.hp * (1 + calculatedStats.vit / 30)));
    setLowHp(Math.round(calculatedStats.hp * (1 + calculatedStats.vit / 30)));
    setEnemyHp(Math.round(enemyStats.hp * (1 + enemyStats.vit / 30)));
    setLowEnemyHp(Math.round(enemyStats.hp * (1 + enemyStats.vit / 30)));
    setEnemyChamp(true);
    setEnemyDiff([0, 0, 0, 0, 0]);
    setResult(null);
    if (enemyStats.name === "Boss") setDropChance(30);
    else setDropChance(1.5);
  };

  const onSetType = set => {
    setFight(set);
    setCrit("");
  };

  const dropConfirm = () => {
    let copyUser = JSON.parse(JSON.stringify(userStats));
    copyUser.exp += exp;
    if (drop) {
      let copyDrop = drop;
      copyUser.items.push(copyDrop);
    }
    if (copyUser.exp >= maxExp) {
      copyUser.lvl += 1;
      copyUser.stats += 3;
      copyUser.exp -= maxExp;
    }
    if (copyUser.items.length) {
      setCalcStats(copyUser);
    } else {
      setCalculatedStats(copyUser);
    }
    setUser(copyUser);
    setDrop(null);
    setShowUserDmg("");
    setShowEnemyDmg("");
    setOkResult(false);
  };

  const onEquip = ind => {
    let copyStats = { ...userStats };
    copyStats.items.forEach(element => {
      element.equipped = false;
    });
    copyStats.items[ind].equipped = true;
    setCalcStats(copyStats);
    setUser(copyStats);
  };

  const levelUp = stat => {
    if (userStats.stats) {
      let copyStats = { ...userStats };
      copyStats[stat] += 1;
      copyStats.stats -= 1;
      setUser(copyStats);
      if (userStats.items.length) {
        setCalcStats(copyStats);
      } else {
        setCalculatedStats(copyStats);
      }
    }
  };

  console.log("isCrit", isCrit);
  console.log("crit", crit);

  return (
    <StyledField>
      <div className="game-wrapper">
        <ChampCard
          stats={calculatedStats}
          showDmg={showUserDmg}
          dmg={toUserDmg}
          hp={hp}
          lowHp={lowHp}
          exp={userStats.exp}
          maxExp={maxExp}
          onEquip={onEquip}
          levelUp={levelUp}
          chances={usrDMG}
        />
        {isCrit ? <div className="crit-dmg">{crit}</div> : null}
        {isBlock ?<div className="block">block</div>: null}
        {enemyChamp && !result ? (
          <div className="radio-wrapper">
            <div
              data-tooltip-id="fightType"
              data-type="info"
              data-tooltip-content="critical chance increased by 30%"
              data-iscapture="true"
            >
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
            <div
              data-tooltip-id="fightType"
              data-type="info"
              data-tooltip-content="critical strike increased by 40%"
              data-iscapture="true"
            >
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
            <div
              data-tooltip-id="fightType"
              data-type="info"
              data-tooltip-content="block increased by 30%"
              data-iscapture="true"
            >
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
            <ReactTooltip id="fightType" />
            <button onClick={() => fightBtn()}>fight</button>
          </div>
        ) : null}
        {result && okResult ? (
          <div className="result-wrapper">
            <div className={`${result} result`}>{result}</div>
            <button onClick={() => dropConfirm()}>take drop</button>
          </div>
        ) : enemyChamp && !result ? (
          <ChampCard
            stats={enemyStats}
            dmg={toEnemyDmg}
            hp={enemyHp}
            lowHp={lowEnemyHp}
            showDmg={showEnemyDmg}
            chances={enemyDMG}
          />
        ) : !drop ? (
          <ChoseEnemy
            confirm={confirmDiff}
            diff={enemyDiff}
            changeDiff={onChangeDiff}
          />
        ) : null}
      </div>
      {drop ? (
        <div className={`drop-wrapper ${drop.rar}`}>
          <div className="Congratulations">
            Congratulations !!! You have drop
          </div>
          <img
            className="weapon-img-drop"
            alt="img"
            src={img_weapons[drop.img]}
          ></img>
          <div>{drop.name || null}</div>
          <div>rarity: {drop.rar || null}</div>
          <div>level: {drop.lvl || null}</div>
          <div>strength: {drop.str || null}</div>
          <div>dextirity: {drop.dex || null}</div>
          <div>vitality: {drop.vit || null}</div>
          <div>agility: {drop.agil || null}</div>
        </div>
      ) : null}
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
    background-color: var(--epic);
    align-self: flex-end;
    margin-right: 10px;
  }
  .hero-exp {
    display: inline-block;
    width: 10px;
    background-color: var(--magic);
    align-self: flex-end;
  }
  .img-wrapper {
    display: flex;
    position: relative;
  }
  .nickname {
    font-size: 18px;
  }
  .userStats-wrapper {
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
  .result {
    font-size: 30px;
    font-weight: 700;
  }
  .WIN {
    color: var(--uncommon);
  }
  .LOSE {
    color: var(--epic);
  }
  .DRAW {
    color: var(--legendary);
  }
  .drop-wrapper {
    text-align: center;
    color: #1aae40;
    div:nth-child(1) {
      font-size: 30px;
    }
    div:nth-child(2) {
      font-size: 24px;
    }
  }
  .common {
    color: var(--common);
  }
  .normal {
    color: var(--normal);
  }
  .uncommon {
    color: var(--uncommon);
  }
  .magic {
    color: var(--magic);
  }
  .rare {
    color: var(--rare);
  }
  .legendary {
    color: var(--legendary);
  }
  .epic {
    color: var(--epic);
  }
  .Congratulations {
    color: var(--uncommon);
    font-size: 30px;
  }
  .result-wrapper {
    padding-right: 20vw;
  }
  .weapon-img-drop {
    width: 100px;
    height: 100px;
  }
  .drop-box {
    width: 300px;
    img {
      width: 50px;
      margin: 1px;
    }
    .img-wrapper {
      display: inline-block;
    }
    .equipped {
      border: 2px var(--legendary) solid;
    }
  }
  .add-stats {
    font-weight: 600;
    margin: 5px;
    display: inline-block;
    cursor: pointer;
    border: 1px solid var(--legendary);
    width: 20px;
    text-align: center;
  }
  .crit-dmg {
    position: fixed;
    top: 12%;
    left: 45%;
    color: var(--epic);
    font-size: 2rem;
    animation: hide 3s forwards;
  }
  .block {
    position: fixed;
    top: 18%;
    left: 45%;
    color: var(--uncommon);
    font-size: 2rem;
    animation: hide 3s forwards;
  }

  @keyframes hide {
    0% {
      font-size: 0.1rem;
      opacity: 1;
    }
    10% {
      font-size: 3rem;
      opacity: 1;
    }
    70% {
      font-size: 2rem;
      opacity: 0.5;
    }
    100% {
      font-size: 0.1rem;
      opacity: 0;
    }
  }
`;
