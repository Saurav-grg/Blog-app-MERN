const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // googleId: String,
  displayName: String,
  email: String,
  profilePicture: String,
  // Add any other fields from the Google profile as needed
  role: { type: String, default: 'user' }, // Add a default role of 'user'
  firebaseUID: {
    type: String,
    sparse: true,
  },
  lastLogin: { type: Date, default: Date.now },
  // permissions: [{ type: String }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
