// backend/src/routes/studentRoutes.js - Missing routes
const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.get('/', studentController.getAllStudents);
router.get('/available', studentController.getAvailableStudents);
router.post('/', studentController.createStudent);

module.exports = router;