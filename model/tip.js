const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tipSchema = new Schema({
  tip: String
})

module.exports = mongoose.model('Tip', tipSchema, 'Tip')
