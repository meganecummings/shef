const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const RecipeSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    ingredients: 
        // type: String,
        // required: true
        // },
    [
        {
            name: {
                type: String,
                required: true,
            },
            amount: {
                type: String,
                required: true,
            },
        }
    ],
    procedure: {
        type: String,
        required: true,
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;