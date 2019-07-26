const db = require('../models');

const recipeList = require('./recipes.json');

// // removes all Recipes and
// db.Recipe.remove({}, () => {
//     recipeList.forEach(recipe => {
//         db.Recipe.create(recipe, (error, createdRecipe) => {
//             if (error) return console.log(error);
//             console.log(createdRecipe);
//         });
//     });
// });