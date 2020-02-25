const calculateCrit = (type, dex, agil, edex, eagil, hero) => {
  // console.log("type", type);
  let rand = Math.random();
  let chance = 1;
  let power = 1;
  let isCrit = false;

  chance = 0.05 + dex / edex / 6;
  if (hero === "assassin") {
    chance *= 1.2;
  }

  if (type === 1 && rand < chance) {
    let randPower = 0.96 * (1 + Math.random() / 2);
    power = randPower * (1.3 + agil / eagil) * 1.2;
    if (hero === "mage") {
      power *= 1.3;
    }
    isCrit = true;
  } else if (type === 0 && rand < chance * 1.3) {
    let randPower = 0.8 * (1 + Math.random() / 2);
    power = randPower * (1.3 + agil / eagil) * 1.2;
    if (hero === "mage") {
      power *= 1.2;
    }
    isCrit = true;
  }

  // console.log("{critPower, critChance, hero}", { power, chance, hero });

  return [power, isCrit];
};

const calculateBlock = (type, dex, estr, hero) => {
  let rand = Math.random();
  let chance = 0;
  let block = 1;

  chance = 0.05 + dex / estr / 8;
  if (hero === "warrior") {
    chance *= 1.2;
  }

  if (type === 2 && rand < chance * 1.2) {
    block = 0;
  } else if (rand < chance) block = 0;

  // console.log("chance block: ", chance);

  return [block, !block];
};

const calculateAttack = (lvl, str, estr, evit, hero) => {
  let attack = str + lvl + (str / (estr * evit)) * 20;

  if (hero === "ogr") {
    attack *= 1.2;
  }
  // console.log('attack: ', attack)

  return attack;
};

export { calculateCrit, calculateBlock, calculateAttack };
