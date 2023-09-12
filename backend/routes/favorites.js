const express = require('express');
const {
    createFavorite,
    getFavorites,
    getFavorite,
    deleteFavorite,
    updateFavorite,
} = require('../controllers/favoritesController');
const router = express.Router();

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