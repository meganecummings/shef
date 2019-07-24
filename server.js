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
});

// New Recipe Route
app.get('/newrecipe', (req, res) => {
    res.sendFile(`${__dirname}/views/newrecipe.html`);
});

//New Recipe Create
app.post('/newrecipe', (req, res) => {
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

// Users Index
app.use('/users', routes.users);

// Recipe Index
app.use('/recipes', routes.recipes);

// // All Recipe Library Endpoints 
// app.use('/library', routes.library);

// // Randomizer Endpoint 
// app.use('/random', routes.random);


// ------------------- SERVER LISTENERS -------------------- //

app.listen(PORT, () => {
    console.log(`Welcome to SHEF! You are connected on port ${PORT}`);
})