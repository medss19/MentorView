// backend/src/routes/parameterRoutes.js
const express = require('express');
const parameterController = require('../controllers/parameterController');

const router = express.Router();

router.get('/', parameterController.getAllParameters);
router.post('/', parameterController.createParameter);

module.exports = router;