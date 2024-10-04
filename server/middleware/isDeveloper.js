const User = require('../models/userModel');
const isDeveloper = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId, role: 'admin' });
    if (!user) {
      return res.status(403).json({
        message: 'Forbidden: User is not the admin',
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = { isDeveloper };
