const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
}, 
{ timestamps: false }
);
module.exports = mongoose.model('Favorites', favoriteSchema);

