const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  name: { type: String },
  email: { type: String },
  booksInLibrary: [{ type: String, ref: 'Book' }],
  booksUserRequested: [{ type: String, ref: 'UserRequestedBook' }],
  booksOtherRequested: [{ type: String, ref: 'OtherRequestedBook' }]
})

module.exports = mongoose.model('User', UserSchema)
