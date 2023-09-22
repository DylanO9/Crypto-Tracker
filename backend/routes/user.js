const express = require('express');
const requireAuth = require('../middleware/requireAuth');

// controller functions
const { signupUser, loginUser, getUsers, getProfile, updateProfile } = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// GET all users
router.get('/', getUsers);

// get profile must have an authenticated user already
router.use(requireAuth);

// GET user profile data
router.get('/profile', getProfile);

// Update user profile data
router.patch('/profile', updateProfile);
module.exports = router;