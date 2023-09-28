const express = require('express');
const { 
    getProfiles,
    getProfile,
    createProfile,
    deleteProfile,
    updateProfile 
} = require('../controllers/profilesController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all profiles routes
router.use(requireAuth);

// GET all profile
router.get('/', getProfiles);

// GET a single profile
router.get('/:id', getProfile);

// POST a new profile
router.post('/', createProfile);

// DELETE a profile
router.delete('/:id', deleteProfile);

// Update a profile
router.patch('/:id', updateProfile);

module.exports = router;

