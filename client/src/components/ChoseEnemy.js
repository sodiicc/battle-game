import React from "react";
import { img_dificulties } from "../assets";
import styled from "styled-components";

const ChoseEnemy = ({ diff, changeDiff, confirm }) => {
  return (
    <StyledDiv>
      <div>
        <div>Сhoose the difficulty of your opponent</div>
        <div className="diff-wrapper">
          <div className="diff">
            <p>easy</p>
            <img className="dificulty-logo" src={img_dificulties.easy} alt='img'></img>
            <div>
              <input
                type="radio"
                id="dificulti1"
                checked={!!diff[0]}
                onChange={() => changeDiff(0)}
                name="diff"
                value="easy"
              />
              <label htmlFor="dificulti1"></label>
            </div>
          </div>
          <div className="diff">
            <p>normal</p>
            <img className="dificulty-logo" src={img_dificulties.normal} alt='img'></img>
            <div>
              <input
                type="radio"
                id="dificulti2"
                name="diff"
                value="normal"
                checked={!!diff[1]}
                onChange={() => changeDiff(1)}
              />
              <label htmlFor="dificulti2"></label>
            </div>
          </div>
          <div className="diff">
            <p>hard</p>
            <img className="dificulty-logo" src={img_dificulties.hard} alt='img'></img>
            <div>
              <input
                type="radio"
                checked={!!diff[2]}
                onChange={() => changeDiff(2)}
                id="dificulti3"
                name="diff"
                value="hard"
              />
              <label htmlFor="dificulti3"></label>
            </div>
          </div>
          <div className="diff">
            <p>Boss</p>
            <img className="dificulty-logo" src={img_dificulties.hell} alt='img'></img>
            <div>
              <input
                type="radio"
                checked={!!diff[3]}
                onChange={() => changeDiff(3)}
                id="dificulti4"
                name="diff"
                value="boss"
              />
              <label htmlFor="dificulti4"></label>
            </div>
          </div>
        </div>
          <button onClick={() => {
            if(diff[0] || diff[1] || diff[2] || diff[3]) confirm()
          }}>confirm</button>
      </div>
    </StyledDiv>
  );
};

export default ChoseEnemy;

const StyledDiv = styled.div`
  text-align: center;
  .dificulty-logo {
    height: 70px;
  }
  .diff-wrapper {
    text-align: center;
    display: flex;
  }
  .diff {
    padding: 20px;
  }
`;
