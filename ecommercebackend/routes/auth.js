const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
], registerUser);

router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
], loginUser);

module.exports = router;

