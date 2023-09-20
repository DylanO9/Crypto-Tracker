const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
}, 
{ timestamps: true }
);
module.exports = mongoose.model('Favorites', favoriteSchema);

