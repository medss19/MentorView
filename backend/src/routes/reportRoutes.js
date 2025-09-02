// backend/src/routes/reportRoutes.js
const express = require('express');
const reportController = require('../controllers/reportController');

const router = express.Router();

router.get('/marksheet/:mentorId', reportController.generateMarksheet);
router.get('/summary/:mentorId', reportController.getEvaluationSummary);

module.exports = router;