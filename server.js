// ----------------- MODULES ------------------ //
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


// ------------------- INSTANCED MODULES -------------------- //
const app = express();
const routes = require('./routes');
const db = require('./models');
const router = express.Router();

// ------------------- GLOBAL VARIABLES -------------------- //
const PORT = process.env.PORT || 4000;

function getTime() {
    return new Date().toLocaleString();
};

// ------------------- MIDDLEWARE -------------------- //
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Serve Public Director 
app.use(express.static(`${__dirname}/public`));

//Middleware
app.use(express.json());

//EJS Middleware
app.set('view engine', 'ejs');

// ------------------- ROUTES -------------------- //
//ROOT ROUTE
app.get('/', (req, res) => {
    // res.sendFile(`${__dirname}/views/index.html`);
    res.render('homepage/show');
});

//Sign up Route
app.get('/signup', (req, res) => {
    res.render('accounts/signup');
});

//Log In Route
app.get('/login', (req, res) => {
    res.render('accounts/login');
});

// New Recipe Route
app.get('/newrecipe', (req, res) => {
    res.sendFile(`${__dirname}/views/newrecipe.html`);
});

// New Recipe Route
app.get('/recipe', (req, res) => {
    res.sendFile(`${__dirname}/views/recipe.html`);
});

// Accounts Route
app.use('/accounts', routes.accounts);

// Recipe Route
// router.get('/:_id', ctrl.recipeCtrl.show);
app.get('/recipes/:_id', (req, res) => {
    db.Recipe.findById(req.params._id, (err, foundRecipe) => {
        if (err) return res.status(400).json({
            status: 400,
            message: 'Something went wrong, YOU GOOFED',
            error: err,
        });
        res.status(200).json({
            status: 200,
            data: foundRecipe,
            requestedAt: getTime()
        });
    });
});

// Recipe(s) Route
app.get('/recipes', (req, res) => {
    res.sendFile(`${__dirname}/views/recipes.html`);
});

//New Recipe Create
app.post('/api/newrecipe', (req, res) => {
    db.Recipe.create(req.body, (err, createdRecipe) => {
        if (err) return res.status(400).json({
            status: 400,
            message: 'Something went wrong! Please try again...',
            error: err
        });
        res.status(200).json({
            status: 201,
            data: createdRecipe,
            requestedAt: getTime(),
        });
    });
});

//New Recipe Delete
app.delete('/api/newrecipe/:_id', (req, res) => {
    db.Recipe.findByIdAndDelete(req.params._id, (err, deletedRecipe) => {
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
});

//New Recipe Update
app.put('/api/newrecipe/:_id', (req, res) => {
    db.Recipe.findByIdAndUpdate(req.params._id, req.body, { new: true }, (err, updatedRecipe) => {
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
});

// Recipe Index
app.use('/api/recipes', routes.recipes);

// Profiles Route
app.use('/profile', routes.profile);


// Accounts Route
app.use('/accounts', routes.accounts);

// // Randomizer Endpoint 
// app.use('/random', routes.random);


// ------------------- SERVER LISTENERS -------------------- //

app.listen(PORT, () => {
    console.log(`Welcome to SHEF! You are connected on port ${PORT}`);
})


//-------------------------------------------------------//
//New Recipe Delete
app.delete('/api/recipes/:_id', (req, res) => {
    db.Recipe.findByIdAndDelete(req.params._id, (err, deletedRecipe) => {
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
});

//New Recipe Update
app.put('/api/recipes/:_id', (req, res) => {
    db.Recipe.findByIdAndUpdate(req.params._id, req.body, { new: true }, (err, updatedRecipe) => {
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
});