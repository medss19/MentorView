// backend/src/routes/mentorRoutes.js
const express = require('express');
const mentorController = require('../controllers/mentorController');

const router = express.Router();

router.get('/', mentorController.getAllMentors);
router.get('/:id', mentorController.getMentorById);
router.post('/', mentorController.createMentor);

module.exports = router;