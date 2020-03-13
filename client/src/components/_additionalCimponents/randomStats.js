const calcRandomStats = champ => {
  let numStats = champ.lvl * 5 + 30;
  let str = 1;
  let dex = 1;
  let vit = 1;
  let agil = 1;
  let hp = champ.lvl * 10 + 80;
  if (champ.class === "boss") {
    numStats += champ.lvl * 2;
    hp *= 1.2
  }else if (champ.class === "warvar"){
    str +=3 +champ.lvl
    vit +=3 +champ.lvl
    dex -=3 +champ.lvl
    agil -=3 +champ.lvl
  }else if (champ.class === "paladin"){
    str +=2 +champ.lvl
    vit +=1 +champ.lvl
    dex -=2 +champ.lvl
    agil -=1 +champ.lvl
  }else if (champ.class === "sorcery"){
    str -=3 +champ.lvl
    vit -=3 +champ.lvl
    dex +=3 +champ.lvl
    agil +=3 +champ.lvl
  }
  for (let i = 0; i < numStats; i++) {
    let rand = Math.random();
    if(rand < 0.25) str += 1
    else if(rand > 0.25 && rand < 0.5)dex += 1
    else if (rand > 0.5 && rand < 0.75)vit += 1
    else agil += 1
  }
  hp *=  (0.8 + 0.4 * Math.random());
  champ.str = str
  champ.dex = dex
  champ.vit = vit
  champ.agil = agil
  champ.hp = hp
  
  return champ
};

export {calcRandomStats}
