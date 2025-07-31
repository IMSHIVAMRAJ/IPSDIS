// routes/membershipRegistrationRoutes.js

const express = require('express');
const router = express.Router();
const {
  register,
  getAllRegistrations,
  acceptRegistration,
  rejectRegistration,
} = require('../controllers/membershipRegistrationController');

const protect = require('../middleware/authMiddleware');

// Public - anyone can register
router.post('/register', register);

// Admin-only
router.get('/',  getAllRegistrations);
router.put('/accept/:id', protect, acceptRegistration);
router.delete('/reject/:id', protect, rejectRegistration);
module.exports = router;
