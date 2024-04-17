const passport = require('passport');
const User = require('./models/userModel');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = process.env.G_C_ID;
const GOOGLE_CLIENT_SECRET = process.env.G_C_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // Find the user in the database based on the Google profile ID
        let user = await User.findOne({ googleId: profile.id });
        const userCount = await User.countDocuments({});
        if (userCount <= 5 && !user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            photos: profile.photos,
            role: 'admin',
          });
        }
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user in the database using the serialized ID
    const user = await User.findById(id);

    // If the user is found, pass the user object to the done callback
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'));
    }
  } catch (err) {
    done(err);
  }
});
