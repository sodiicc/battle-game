import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components'
import { img_heroes } from "../assets";
import {Tooltip as ReactTooltip} from "react-tooltip";
import { api } from "../api";
import { useNavigate } from "react-router-dom"

const GameRegistration = props => {
  const navigate = useNavigate()
  let dispatch = useDispatch();
  let user = useSelector(state => state.user);

  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
    api
      .get("/heroes")
      .then(res => setHeroes(res.data))
      .catch(err => console.log(err));
  }, [props.history]);

  useEffect(() => {
    if (user.class.length > 2) {
      navigate("/game");
    } else {
      navigate("/");
    }
  }, [navigate, user.class]);

  const onChoose = e => {
    let hero = heroes.find(el => el.class === e.target.name);
    hero.name = user.name;
    api
      .post("/users/update", hero)
      .then(res =>
        dispatch({ type: "SET_USER", payload: JSON.parse(res.config.data) })
      )
      .then(() => navigate("/game"));
  };
  const passive = [
    "Warrior's block is increased to 30%",
    "Assassin's crit chanse is increased to 30%",
    "Mage's crit power is increased to 60%",
    "Ogre's attack is increased to 20%"
  ];
  const description = [
    "Champ with shield, high HP and strong hit",
    "Champ with daggers, has high accuracy and crit chance",
    "Champ with a very low HP , but with huge critical strake",
    "Champ has a very high HP and huge damage, bad accuracy and block"
  ];

  return (
    <StyledGame>
      {user?.name?.length ? (
        <div>
          <div>Choose your class</div>
          {
            <div className="card-wrapper">
              {heroes.map((item, index) => {
                return (
                  <div key={item.class} className="card-class">
                    <div name={item.class}>{item.class}</div>
                    <img
                      className="img-class"
                      name={item.class}
                      onClick={e => onChoose(e)}
                      src={img_heroes[item.class]}
                      alt="img"
                      data-tooltip-id={"register" + index}
                      data-type="info"
                      data-tooltip-content={passive[index]}
                    ></img>
                    <p>Hp: {item.hp}</p>
                    <p>Str: {item.str}</p>
                    <p>Dex: {item.dex}</p>
                    <p>Vit: {item.vit}</p>
                    <p>Agil: {item.agil}</p>
                    <ReactTooltip
                      id={"register" + index}
                      multiline={true}
                      aria-haspopup="true"
                    >
                      <p>{passive[index]}</p>
                      <p>{description[index]}</p>
                    
                    </ReactTooltip>
                  </div>
                );
              })}
            </div>
          }
        </div>
      ) : (
        <div style={{textAlign: 'center'}}>
        <div style={{ fontWeight: 700, fontSize: "30px" }}>
          LOG IN or CREATE an ACCOUNT !
        </div>
        <img style={{width: '100%'}} src='https://images.alphacoders.com/103/1032803.jpg' alt='img' />

        </div>
      )}
    </StyledGame>
  );
};

export default GameRegistration;

const StyledGame = styled.div`
  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .img-class {
    width: 150px;
    display: block;
    cursor: pointer;
  }
  .card-class {
    padding: 10px 20px;
  }
`
