// backend/src/middlewares/errorHandler.js
const errorHandler = (error, req, res, next) => {
  console.error(error.stack);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

module.exports = errorHandler;