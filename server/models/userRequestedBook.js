const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserRequestedBookSchema = new Schema({
  bookId: {
    type: String,
    unique: true,
    required: true
  },
  owner: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('UserRequestedBook', UserRequestedBookSchema)
