const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route - no authentication required
router.get('/', eventController.getAllEvents);

// Protected routes - authentication required
router.post('/', authMiddleware.protect, eventController.createEvent);
router.get('/my-events', authMiddleware.protect, eventController.getMyEvents);

module.exports = router; 