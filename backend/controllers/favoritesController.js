const Favorites = require('../models/favoritesModel');
const mongoose = require('mongoose');

// get all favorites
const getFavorites = async (req, res) => {
    const user_id = req.user._id;

    const favorites = await Favorites.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(favorites);
};



// get a single favorite
const getFavorite = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such favorite'});
    }

    const favorite = await Favorites.findById(id);

    if (!favorite) {
        return res.status(404).json({error: 'Favorite not found'});
    }

    res.status(200).json(favorite);
};


// create new favorite
const createFavorite = async (req, res) => {
    const { id } = req.body;

    // add doc to db
    try{
        const user_id = req.user._id;
        const favorite = await Favorites.create({id, user_id});
        res.status(200).json(favorite);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// delete a favorite
const deleteFavorite = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such favorite'});
    }

    const favorite = await Favorites.findOneAndDelete({_id: id});

    if (!favorite) {
        return res.status(404).json({error: 'Favorite not found'});
    }

    res.status(200).json(favorite);
};

// update a favorite
const updateFavorite = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such favorite'});
    }

    const favorite = await Favorites.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!favorite) {
        return res.status(404).json({error: 'Favorite not found'});
    }

    res.status(200).json(favorite);
};

module.exports = {
    createFavorite,
    getFavorites,
    getFavorite,
    deleteFavorite,
    updateFavorite,
};
