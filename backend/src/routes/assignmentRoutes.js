// backend/src/routes/assignmentRoutes.js
const express = require('express');
const assignmentController = require('../controllers/assignmentController');

const router = express.Router();

router.get('/mentor/:mentorId', assignmentController.getMentorAssignments);
router.get('/mentor/:mentorId/filtered', assignmentController.getFilteredAssignments);
router.post('/assign', assignmentController.assignStudent);
router.delete('/:assignmentId', assignmentController.removeAssignment);
router.post('/mentor/:mentorId/submit', assignmentController.submitAssignments);

module.exports = router;