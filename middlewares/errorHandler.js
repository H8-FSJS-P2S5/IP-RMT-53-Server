const errorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({
        error: 'Validation Error',
        messages: err.errors.map(e => e.message) // Mapping Sequelize validation errors
      });
    } else if (err.name === 'UnauthorizedError') {
      res.status(401).json({
        error: 'Invalid credentials',
        message: err.message || 'Email or password is incorrect'
      });
    } else if (err.name === 'AuthenticationError') {
      res.status(401).json({
        error: 'Authentication Error',
        message: err.message || 'You need to log in to access this resource'
      });
    } else if (err.name === 'ForbiddenError') {
      res.status(403).json({
        error: 'Forbidden Access',
        message: err.message || 'You do not have permission to access this resource'
      });
    } else if (err.name === 'NotFoundError') {
      res.status(404).json({
        error: 'Resource Not Found',
        message: err.message || 'The requested data was not found'
      });
    } else {
      // Default to 500 Internal Server Error
      res.status(500).json({
        error: 'Internal Server Error',
        message: err.message || 'Something went wrong on the server'
      });
    }
  };
  
  module.exports = errorHandler;
  