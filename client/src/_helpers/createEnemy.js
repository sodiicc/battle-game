import axios from 'axios'

const createEnemy = () => {
  axios.post("/enemies/add", {
    name: "bot-sorcery",
    class: "sorcery",
    lvl: 2,
    exp: 0,
    hp: 75,
    str: 6,
    dex: 12,
    vit: 9,
    agil: 15
  });
};

export default createEnemy