// Middleware to check user role
const checkAdminRole = (req, res, next) => {
    // Assuming you have a way to determine the user role (e.g., using authentication middleware)
    // Check if the user role is 'admin'
    if (req.query.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    next();
  };

module.exports = checkAdminRole;