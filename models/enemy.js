const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const enemySchema = new Schema({
  name: {type: String, required:  true},
  class: {type: String, required:  false},
  lvl: {type: Number, required:  false},  
  hp: {type: Number, required:  false},
  str: {type: Number, required:  false},
  exp: {type: Number, required:  false},
  dex: {type: Number, required:  false},
  vit: {type: Number, required:  false},
  agil: {type: Number, required:  false} 
}, {
  timestamps: true,
})

const Enemy = mongoose.model('Enemy', enemySchema);
module.exports = Enemy;