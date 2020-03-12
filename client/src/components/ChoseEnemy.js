import React, {useState} from "react";
import { img_dificulties } from "../assets";
import styled from "styled-components";

const ChoseEnemy = ({ diff, changeDiff, confirm }) => {

  const [lvl, setLvl] = useState(1)

  const setDiff = (e) => {
    if(e<6 && e>0){
      setLvl(+e)
      changeDiff(4, +e)
    }
  }

  return (
    <StyledDiv>
      <div>
        <div style={{marginBottom: '1rem'}}>Сhoose the difficulty of your opponent</div>
        <div>custom level
              <input
              className='ml-3'
                type="radio"
                id="dificulti5"
                name="diff"
                value="custom"
                checked={!!diff[4]}
                onChange={(e) => changeDiff(4, lvl)}
              />
              <label htmlFor="dificulti5"></label>
             <button className='ml-2 lvl-butt'  onClick={(e) => setDiff(lvl-1)}>-</button> 
             <span className='lvl'>{lvl}</span>
             <button className='lvl-butt'  onClick={(e) => setDiff(lvl+1)}>+</button> 
              {/* <input className='ml-1' min='1' max='5' placeholder='choose enemy level' type='number' value={lvl} onChange={(e) => setDiff(+e.target.value)} /> */}
            </div>
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
            if(diff[0] || diff[1] || diff[2] || diff[3] || diff[4]) confirm()
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
  .lvl {
    padding: 0 5px;
    margin: 0 10px;
    background-color: var(--common);
  }
  .lvl-butt {
    font-size: 0.8rem;
  }
`;
