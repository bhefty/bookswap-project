const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = require('./user').schema

const BookSchema = new Schema({
  bookId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  authors: [{ type: String }],
  description: { type: String },
  coverImg: { type: String },
  owners: [UserSchema]
})

module.exports = mongoose.model('Book', BookSchema)
