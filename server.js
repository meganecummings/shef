// ----------------- MODULES ------------------ //
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var cors = require('cors');

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
//Express Sessions
app.use(session({
    secret: 'This secret can be anything you want. It is used to encrpyt the session object',
    resave: false,
    saveUninitialized: false,
}))

// own middleware
app.use((req, res, next) => {
    next();
})

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
    res.render('homepage/show', { currentUser: req.session.currentUser });
});

//Sign up Route
app.get('/signup', (req, res) => {
    res.render('accounts/signup', { currentUser: req.session.currentUser });
});

//Log In Route
app.get('/login', (req, res) => {
    res.render('accounts/login', { currentUser: req.session.currentUser });
});

// New Recipe Route
app.get('/newrecipe', (req, res) => {
    res.render('profile/newrecipe', { currentUser: req.session.currentUser });
});

// Profiles Route
app.use('/profile', routes.profile);

// Accounts Route
app.use('/accounts', routes.accounts);

// Recipe(s) Route
app.get('/recipe', (req, res) => {
    res.render('profile/recipe', { currentUser: req.session.currentUser });
});

// Recipe(s) Route
app.get('/recipes', (req, res) => {
    res.render('profile/recipes', { currentUser: req.session.currentUser });
});

// Accounts Route
app.use('/accounts', routes.accounts);

// Recipe Route
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

// API Routing 
// Recipe Routing
app.use('/api/recipes', routes.recipes);

//Users Routing
app.get('/api/v1/users', (req, res) => {
    db.User.find({}, (err, allUsers) => {
        if (err) return res.json({ status: 400, error: err });
        res.json({ status: 200, data: allUsers });
    });
});

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