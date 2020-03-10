const calculateCrit = (type, dex, agil, edex, eagil, hero) => {
  let rand = Math.random();
  let chance = 1;
  let power = 1;
  let isCrit = false;

  chance = 0.05 + dex / edex / 10;
  if (hero === "assassin") chance *= 1.3;
  
  if (type === 0) chance *= 1.3

  let randPower=1
  if (type === 1) {
    randPower = 1.12 * (1 + Math.random() / 2);
    randPower = randPower * (1.3 + agil / eagil) * 1.2;
    if (hero === "mage") {
      randPower *= 1.5;
    }
    if(rand < chance){
      power = randPower
      isCrit = true;
    }
  } else if (type === 0 ) {
    randPower = 0.8 * (1 + Math.random() / 2);
    randPower = randPower * (1.3 + agil / eagil) * 1.2;
    if (hero === "mage") {
      randPower *= 1.6;
    }
    if(rand < chance) {
      power = randPower
      isCrit = true;
    }
  }else{
    randPower = 0.75 * (1 + Math.random() / 2);
    randPower = randPower * (1.3 + agil / eagil) * 1.2;
    if (hero === "mage") {
      randPower *= 1.6;
    }
    if(rand < chance) {
      power = randPower
      isCrit = true;
    }
  }

  return [power, isCrit, chance, randPower];
};

const calculateBlock = (type, dex, estr, hero) => {
  let rand = Math.random();
  let chance = 0;
  let block = 1;

  chance = 0.05 + dex / estr / 10;
  if (hero === "warrior") chance *= 1.2
  if (type === 2) chance *= 1.3
  
  if (type === 2 && rand < chance ) {
    block = 0;
  } else if (rand < chance) block = 0;
  
  // console.log('chance', chance, dex, estr)
  return [block, !block, chance];
};

const calculateAttack = (lvl, str, estr, evit, hero) => {
  let attack = str + lvl + (str / (estr * evit)) * 20;

  if (hero === "ogr") {
    attack *= 1.2;
  }

  return attack;
};

export { calculateCrit, calculateBlock, calculateAttack };
