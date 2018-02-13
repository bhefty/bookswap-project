const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  coverImg: { type: String }
})

module.exports = mongoose.model('Book', BookSchema)
