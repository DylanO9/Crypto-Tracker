const express = require('express');
const {
    createFavorite,
    getFavorites,
    getFavorite,
    deleteFavorite,
    updateFavorite,
} = require('../controllers/favoritesController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all favorites routes
router.use(requireAuth);

// GET all favorites
router.get('/', getFavorites);

// GET a single favorite
router.get('/:id', getFavorite);

// POST a new favorite
router.post('/', createFavorite);

// DELETE a favorite
router.delete('/:id', deleteFavorite);

// Update a favorite
router.patch('/:id', updateFavorite);

module.exports = router;