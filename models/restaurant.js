const mongoose = require('mongoose')

const restSchema = new mongoose.Schema({
  rname: String,
  imgdata: String,
  address: String,
  delimg: String,
  somedata: String,
  price: String,
  rating: String,
  arrimg: String,
})

module.exports = mongoose.model('Restraunt', restSchema)
