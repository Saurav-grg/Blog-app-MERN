const passport = require('passport');
const express = require('express');
const router = express.Router();
// const proxy = require('express-http-proxy');
// const CLIENT_URL = 'http://localhost:5173/';
const CLIENT_URL = 'https://zenith-quest.vercel.app/';

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Login Failed',
  });
});
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: req.user,
    });
  } else {
    res.status(403).json({ success: false, message: 'not authorized' });
  }
});
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: 'Error logging out' });
    }
    // Destroy the session
    req.session.destroy(function (err) {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: 'Error destroying session' });
      }
      // Redirect or send a success response
      res.redirect(CLIENT_URL);
    });
  });
});
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

module.exports = router;
