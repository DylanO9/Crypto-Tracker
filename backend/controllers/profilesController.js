const Profiles = require('../models/profilesModel');
const mongoose = require('mongoose');

// get all profiles
const getProfiles = async (req, res) => {
    const user_id = req.user._id;

    const profiles = await Profiles.find({ user_id });

    res.status(200).json(profiles);
}

// get current profile
const getProfile = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such profile'});
    }

    const profile = await Profiles.findById(id);

    if (!profile) {
        return res.status(404).json({error: 'Profile not found'});
    }

    res.status(200).json(profile);
}

// create new profile
const createProfile = async (req, res) => {
    const { email } = req.body;

    // add doc to db
    try{
        const user_id = req.user._id;
        const profile = await Profiles.create({email, user_id});
        res.status(200).json(profile);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// delete a profile
const deleteProfile = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such profile'});
    }

    const profile = await Profiles.findOneAndDelete({_id: id});

    if (!profile) {
        return res.status(404).json({error: 'Profile not found'});
    }
}

// update a profile
const updateProfile = async (req, res) => {
    const { id } = req.params;

    const profile = await Profiles.findOneAndUpdate({email: id}, {...req.body}, {new: true, upsert: true});

    if (!profile) {
        return res.status(404).json({error: 'Profile not found'});
    }

    res.status(200).json(profile);
}

module.exports = { 
    getProfiles,
    getProfile,
    createProfile,
    deleteProfile,
    updateProfile 
    };