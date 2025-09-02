// backend/src/middlewares/validation.js - Input validation middleware
const { body, validationResult } = require('express-validator');

const validateStudent = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('rollNo').trim().notEmpty().withMessage('Roll number is required'),
];

const validateMentor = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
];

const validateAssignment = [
  body('mentorId').notEmpty().withMessage('Mentor ID is required'),
  body('studentId').notEmpty().withMessage('Student ID is required'),
];

const validateMarks = [
  body('assignmentId').notEmpty().withMessage('Assignment ID is required'),
  body('marks').isArray({ min: 1 }).withMessage('Marks array is required'),
  body('marks.*.parameterId').notEmpty().withMessage('Parameter ID is required'),
  body('marks.*.marksObtained').isInt({ min: 0, max: 10 }).withMessage('Marks should be between 0-10'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateStudent,
  validateMentor,
  validateAssignment,
  validateMarks,
  handleValidationErrors
};
