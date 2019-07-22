// ----------------- MODULES ------------------ //
const express = require('express');
const bodyParser = require('body-parser');


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
app.get('/', (req, res)=> {
    res.sendFile(`${__dirname}/views/index.html`);
    // res.render('index');
});

// Users Index
app.get('/users', (req, res) => {
    db.User.find({}, (err, allUsers) => {
        console.log(allUsers);
        if (err) return res.sendStatus(400).json({
            status: 400,
            message: 'Something went wrong, please try again'
        });
        res.status(200).json({
            status: 200,
            numberOfResults: allUsers.length,
            data: allUsers,
            requestedAt: getTime(),
        });
    });
    // console.log(allUsers);

});

// Users Create
app.post('/users', (req, res) => {
    const newUser = req.body;
    db.User.create(newUser, (err, createdUser) => {
        if (err) return res.status(400).json({
            status: 400,
            message: 'Something went wrong, please try again',
        });
        res.status(200).json({
            status: 201,
            data: createdUser,
            requestedAt: getTime(),
        });
    });
});

// Recipe Index
app.get('/recipes', (req, res) => {
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
});

// Recipes SHOW 
app.get('/recipes/:recipe_name', (req, res) => {
    db.Recipe.findOne(req.params.recipe_name, (err, foundRecipe) => {
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
});

// Recipe Create
app.post('/recipes', (req, res) => {
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
});

// Recipe Update 
app.put('/recipes/:name', (req, res) => {
    db.Recipe.findOneAndUpdate(req.params.name, req.body, { new: true }, (err, updatedRecipe) => {
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
});

// Recipe DESTROY
app.delete('/recipes/:name', (req, res) => {
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
});

// All Recipe Library Endpoints 
app.use('/library', routes.library);

// Randomizer Endpoint 
app.use('/random', routes.random);

//HTML

//API


// ------------------- SERVER LISTENERS -------------------- //

app.listen(PORT, () => {
    console.log(`Welcome to SHEF! You are connected on port ${PORT}`);
})