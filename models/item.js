const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {type: String, required:  true}, 
  hp: {type: Number, required:  false},
  lvl: {type: Number, required:  false},
  str: {type: Number, required:  false},
  dex: {type: Number, required:  false},
  vit: {type: Number, required:  false},
  agil: {type: Number, required:  false},
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;