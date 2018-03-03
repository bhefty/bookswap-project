const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: { type: String, required: true },
  email: { type: String },
  location: { type: String },
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

module.exports = {
  schema: UserSchema,
  model: mongoose.model('User', UserSchema)
}
