const isAuthorized = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'You need to log in' });
  }

  // User is authenticated, proceed to the next middleware/route handler
  next();
};
module.exports = { isAuthorized };
