console.log('Hey there!')

// ----------------- CONSTANT VARIABLES ------------------ //
const BASE_URL = ('/recipes');

// ------------------- GLOBAL VARIABLES -------------------- //

// ------------------- STATE VARIABLES -------------------- //
const state = {
    recipes: [],
    filtered: []
}

// ------------------- DOM ELEMENTS -------------------- //
const newRecipeForm = document.getElementById('newRecipeForm');

// ------------------- FUNCTIONS -------------------- //

// const getAllRecipes = () => {
//     fetch(BASE_URL, {

//     })
//         .then((response) => {
//         response.json()
//         // console.log(response)
//         })
//         .then(json => {
//             console.log(json)
//             state.recipes = json;
//         })
//         .catch((err) => console.log(err))
// }

// getAllRecipes();

const addNewRecipe = (event) => {
    event.preventDefault();
    const name = document.getElementById('name');
    const ingredients = document.getElementById('ingredients');
    const procedure = document.getElementById('procedure');
    const newRecipe = ({ name: name.value, ingredients: ingredients.value, procedure: procedure.value });
    console.log(JSON.stringify(newRecipe))
    fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(newRecipe),
    })
        .then((res) => res.json())
        .then((data) => {
            state.recipes.push(data.data);
            name.value = '';
            ingredients.value = '';
            procedure.value = '';
            name.focus();
            newRecipeSuccess(data);
        })
        .catch((err) => console.log(err))
};

const newRecipeSuccess = (response) => {
    console.log(response);
};

const newRecipeError = (error) => {
    alert(error);
};

// ------------------- EVENT LISTENERS -------------------- //
newRecipeForm.addEventListener('submit', addNewRecipe);