const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  name: { type: String, required: true },
  email: { type: String },
  booksInLibrary: [{ type: String }],
  booksUserRequested: [{
    bookId: { type: String },
    ownerId: { type: String }
  }],
  booksOtherRequested: [{
    bookId: { type: String },
    requesterId: { type: String }
  }]
})

module.exports = mongoose.model('User', UserSchema)
