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


// ------------------- MIDDLEWARE -------------------- //
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Serve Public Director 
app.use(express.static(`${__dirname}/public`));

app.use(express.json());


//EJS Middleware
app.set('view engine', 'ejs');

// ------------------- ROUTES -------------------- //

app.use('/', (req, res)=> {
    res.render('index');
});

// // All User Endpoints
app.use('/users', (req, res) => {
    db.User.create(req.body, (err, newUser) => {
        if (err) return res.sendStatus(400);
        res.sendStatus(200);
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
    console.log('Welcome to SHEF! You are connected on port ${PORT}');
})