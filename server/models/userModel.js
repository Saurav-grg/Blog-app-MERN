const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  photos: [{ value: String }],
  // Add any other fields from the Google profile as needed
  role: { type: String, default: 'user' }, // Add a default role of 'user'
  // permissions: [{ type: String }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
