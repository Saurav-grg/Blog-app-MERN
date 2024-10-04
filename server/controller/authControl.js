const User = require('../models/userModel');
const genTokenAndSetCookie = require('../utils/genTokenAndSetCookie');
const admin = require('../utils/firebase');
const google = async (req, res) => {
  try {
    // Verify the ID token
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;
    let user = await User.findOne({ email: email });

    if (user) {
      // Update user information if necessary
      user.lastLogin = new Date();
      if (!user.firebaseUID) {
        user.firebaseUID = uid;
      }
      await user.save();
    } else {
      // Create a new user
      user = new User({
        displayName: name,
        email: email,
        firebaseUID: uid,
        profilePicture: picture,
      });
      await user.save();
    }

    // Generate token and set cookie
    genTokenAndSetCookie(res, user._id);
    res.status(200).json({
      success: true,
      message: user.isNew
        ? 'User created successfully'
        : 'Logged in successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error('Google authentication error:', error);
    res
      .status(400)
      .json({ success: false, message: 'Google authentication failed' });
  }
};
const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log('Error in checkAuth ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
module.exports = { google, checkAuth, logout };
