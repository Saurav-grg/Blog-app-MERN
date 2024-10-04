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
const MAX_USERS = 10;

// Pre-save hook to enforce the user limit
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const userCount = await mongoose.model('User').countDocuments();
    if (userCount >= MAX_USERS) {
      return next(new Error('Maximum number of users reached'));
    }
  }
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
