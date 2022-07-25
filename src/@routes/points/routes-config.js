const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Add all routes here
router.get('', controller.getAll);

module.exports = router;