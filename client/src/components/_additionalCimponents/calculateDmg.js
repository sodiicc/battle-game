const calculateCrit = (type, dex, agil, edex, eagil) => {
  // console.log("type", type);
  let rand = Math.random();
  let chance = 1;
  let power = 1;
  let isCrit = false

  chance = 0.05 + dex / edex / 6;

  if (type === 1 && rand < chance) {
    let randPower = 0.96 * (1 + Math.random() / 2);
    power = randPower * (1.3 + agil / eagil )*1.2;
    isCrit = true

  } else if (type === 0 && rand < chance + 0.2) {
    let randPower = 0.8 * (1 + Math.random() / 2);
    power = randPower * (1.3 + agil / eagil )*1.2;
    isCrit = true
  }

  // console.log("{crotPower, critChance}", { power, chance });

  return [power, isCrit]
};

const calculateBlock = (type, dex, estr) => {
  let rand = Math.random();
  let chance = 0;
  let block = 1;


  chance = 0.05 + dex / estr / 8;

  if (type === 2 && rand < chance + 0.1) {
    block = 0;

  } else if (rand < chance) block = 0;

  // console.log("chance block: ", chance);

  return [block, !block]
};

const calculateAttack = ( lvl, str,  estr, evit) => {
  let attack = str+lvl + str / (estr*evit)*20 ;
  // console.log('attack: ', attack)

  return attack;
};

export { calculateCrit, calculateBlock, calculateAttack };
