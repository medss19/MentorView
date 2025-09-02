// backend/src/routes/markRoutes.js - Missing routes
const express = require('express');
const markController = require('../controllers/markController');

const router = express.Router();

router.post('/', markController.updateMarks);
router.get('/assignment/:assignmentId', markController.getAssignmentMarks);

module.exports = router;