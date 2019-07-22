// ----------------- MODULES ------------------ //
const express = require('express');
const bodyParser = require('body-parser');


// ------------------- INSTANCED MODULES -------------------- //
const app = express();
const routes = require('./routes');
const db = require('./models');


// ------------------- GLOBAL VARIABLES -------------------- //
const PORT = process.env.PORT || 4000;


// ------------------- MIDDLEWARE -------------------- //
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Serve Public Director 
app.use(express.static(`${__dirname}/public`));

app.use(express.json());

// ------------------- ROUTES -------------------- //

app.use('/', (req, res)=> {
    res.sendFile(`${__dirname}/views/index.html`);
});

// // All User Endpoints
// app.use('/api/user', routes.user);

// // All Recipe Endpoints 
// app.use('/api/recipes', routes.recipes);

//HTML

//API

// ------------------- SERVER LISTENERS -------------------- //

app.listen(PORT, () => {
    console.log('Welcome to SHEF! You are connected on port ${PORT}');
})