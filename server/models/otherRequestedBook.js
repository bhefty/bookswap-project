const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OtherRequestedBookSchema = new Schema({
  bookId: {
    type: String,
    unique: true,
    required: true
  },
  requester: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('OtherRequestedBook', OtherRequestedBookSchema)
