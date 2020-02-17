const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const heroSchema = new Schema({
  username: {type: String, required:  true}, 
  description: {type: String, required:  true}, 
  duration: {type: "Mixed", required:  true}, 
  date: {type: Date, required:  true}, 
}, {
  timestamps: true,
})

const Hero = mongoose.model('Hero', heroSchema);
module.exports = Hero;