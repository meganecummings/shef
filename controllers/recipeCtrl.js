const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

module.exports = {
    index: (req, res) => {
        db.Recipe.find({}, (err, allRecipes) => {
            console.log(allRecipes);
            if (err) return res.sendStatus(400).json({
                status: 400,
                message: 'Something went wrong, please try again'
            });
            res.status(200).json({
                status: 200,
                numberOfResults: allRecipes.length,
            data: allRecipes,
                requestedAt: getTime(),
            });
        });
    },

    show: (req, res) => {
        db.Recipe.findOne(req.params.name, (err, foundRecipe) => {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again',
            });
            res.status(200).json({
                status: 200,
                data: foundRecipe,
                requestedAt: getTime()
            });
        });
    },

    new: (req, res) => {
        const newRecipe = req.body;
        db.Recipe.create(newRecipe, (err, createdRecipe) => {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again',
            });
            res.status(200).json({
                status: 201,
                data: createdRecipe,
                requestedAt: getTime(),
            });
        });
    },

    update: (req, res) => {
        db.Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedRecipe) => {
            console.log(req.body);
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again',
            });
            res.status(200).json({
                status: 202,
                data: updatedRecipe,
                requestedAt: getTime(),
            });
        });
    },

    delete: (req, res) => {
        db.Recipe.findOneAndDelete(req.params.name, (err, deletedRecipe) => {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again',
            });
            res.status(200).json({
                status: 200,
                message: `Successfully deleted ${deletedRecipe}`,
                requestedAt: getTime(),
            });
        });
    }, 
};