const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {type: String, required:  false}, 
  img: {type: String, required:  false}, 
  rar: {type: String, required:  false}, 
  hp: {type: Number, required:  false},
  lvl: {type: Number, required:  false},
  str: {type: Number, required:  false},
  dex: {type: Number, required:  false},
  vit: {type: Number, required:  false},
  agil: {type: Number, required:  false},
  equipped: {type: Boolean, required:  false}
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;