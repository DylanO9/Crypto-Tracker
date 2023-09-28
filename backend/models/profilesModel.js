const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
        unique: true,
    },
    name: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    }
});

module.exports = mongoose.model('Profiles', profileSchema);