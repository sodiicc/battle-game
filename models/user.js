const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required:  true}, 
  password: {type: String, required:  false},
  class: {type: String, required:  false},
  exp: {type: Number, required:  false},
  hp: {type: Number, required:  false},
  lvl: {type: Number, required:  false},
  str: {type: Number, required:  false},
  dex: {type: Number, required:  false},
  vit: {type: Number, required:  false},
  agil: {type: Number, required:  false},
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema);
module.exports = User;