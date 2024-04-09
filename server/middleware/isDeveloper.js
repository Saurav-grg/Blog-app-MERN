const isDeveloper = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized for this request' });
  } // Call the next middleware or route handler

  const user = req.user;
  // console.log(user);
  // Check if the user is a developer

  if (user.role === 'developer') {
    // User is a developer, proceed to the next middleware/route handler
    next();
  } else {
    // User is not a developer
    res.status(403).json({ error: 'not a admin' });
  }
};
module.exports = { isDeveloper };
