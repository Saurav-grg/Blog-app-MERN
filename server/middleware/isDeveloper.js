const isDeveloper = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized for this request' });
  }

  // Check if the user is a developer
  const user = req.user;
  if (user.role === 'developer') {
    // User is a developer, proceed to the next middleware/route handler
    next();
  } else {
    // User is not a developer
    res.status(403).json({ error: 'not a admin' });
  }
};
module.exports = { isDeveloper };
