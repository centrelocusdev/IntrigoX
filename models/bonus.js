const mongoose = require('mongoose');

const bonusSchema = new mongoose.Schema({
bonus: String,
targetScore: Number
})
const Bonus = mongoose.model('Bonus' , bonusSchema);
module.exports = Bonus;