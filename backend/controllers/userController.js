const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({mssg: error.message});
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.signup(email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({mssg: error.message});
    }
}

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: -1});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// get user profile data
const getProfile = async (req, res) => {
    try {
        const profileData = req.user.profile;
        res.status(200).json(profileData);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// update user profile data
const updateProfile = async (req, res) => {
    const { username, name, age } = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.profile = { username, name, age };
        await user.save();
        res.status(200).json(user.profile);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { signupUser, loginUser, getUsers, getProfile, updateProfile };