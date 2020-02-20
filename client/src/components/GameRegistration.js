import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { img_heroes } from "../assets";

const GameRegistration = props => {
  let dispatch = useDispatch();
  let user = useSelector(state => state.user);

  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
    axios
      .get("/heroes")
      .then(res => setHeroes(res.data))
      .catch(err => console.log(err));
  }, [props.history]);

  useEffect(() => {
    if (user.class.length > 2) {
      props.history.push("/game");
    } else {
      props.history.push("/");
    }
  }, [user.name, props.history, user.class]);

  const onChoose = e => {
    let hero = heroes.find(el => el.class === e.target.name);
    hero.name = user.name;
    axios
      .post("/users/update", hero)
      .then(res =>
        dispatch({ type: "SET_USER", payload: JSON.parse(res.config.data) })
      )
      .then(() => props.history.push("/game"));
  };

  return (
    <StyledGame>
      {user.name.length ? (
        <div>
          <div>Choose your class</div>
          {
            <div className="card-wrapper">
              {heroes.map(item => {
                return (
                  <div key={item.class} className="card-class">
                    <div name={item.class}>{item.class}</div>
                    <img
                      className="img-class"
                      name={item.class}
                      onClick={e => onChoose(e)}
                      src={img_heroes[item.class]}
                      alt='img'
                    ></img>
                    <p>Hp: {item.hp}</p>
                    <p>Str: {item.str}</p>
                    <p>Dex: {item.dex}</p>
                    <p>Vit: {item.vit}</p>
                    <p>Agil: {item.agil}</p>
                  </div>
                );
              })}
            </div>
          }
        </div>
      ) : (
        <div style={{ fontWeight: 700, fontSize: "30px" }}>
          LOG IN or CREATE ACCOUNT !
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
`;
