const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    // console.log(req.cookies);
    const token = req.cookies['__Host-jwt'];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized - no token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized - invalid token' });

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('Error in verifyToken ', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
module.exports = verifyToken;
