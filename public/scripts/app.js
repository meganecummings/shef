console.log('Hey there!');


// ----------------- CONSTANT VARIABLES ------------------ //
const BASE_URL = ('/newrecipe');
const LIB_URL = ('/api/recipes');

// ------------------- GLOBAL VARIABLES -------------------- //

// ------------------- STATE VARIABLES -------------------- //
const libary = {
    
    filtered: []
}

const state = {
    recipe: {},
    recipes: []
}

// ------------------- DOM ELEMENTS -------------------- //
const newRecipeForm = document.getElementById('newRecipeForm');
const recipesSection = document.getElementById('recipesSection');
const recipesLibrary = document.getElementById('recipesLibrary');

// ------------------- FUNCTIONS -------------------- //

const render = () => {
    recipesSection.innerHTML = '';
        const template = recipeTemplate(state.recipe);
        recipesSection.insertAdjacentHTML('afterbegin', template);
}

const renderLib = () => {
    recipesLibrary.innerHTML = '';
    state.recipes.forEach(data => {
        console.log(data);
        const template = libTemplate(data);
        recipesLibrary.insertAdjacentHTML('afterbegin', template);
      });
}


const recipeTemplate = (recipe) => {    
    return `
    <div id="${recipe.name}">
    <h4>${recipe.name}</h4>
    <p class="ingredients">${recipe.ingredients}</p>
    <p class="procedure">${recipe.procedure}</p>
    <button class="delete-button">Delete</button>
    <button class="edit-button">Edit</button>
    </div>
    `
}

const libTemplate = (recipe) => {    
    return `
    <div id="${recipe._id}">
    <h4>${recipe.name}</h4>
    `
}


const getAllRecipes = () => {
    fetch(LIB_URL)
    .then((res) => res.json())
    .then(json => {
      state.recipes = json.data;
      renderLib(state.recipes);
    })
    .catch((err) => console.log({ err }));
    
}

getAllRecipes();


const addNewRecipe = (event) => {
    event.preventDefault();

    //Create submission data variable
    const name = document.getElementById('name');
    const ingredients = document.getElementById('ingredients');
    const procedure = document.getElementById('procedure');
    const newRecipe = ({ name: name.value, ingredients: ingredients.value, procedure: procedure.value });
    console.log(JSON.stringify(newRecipe))

    // Data to submit
    fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
    })
        .then((res) => res.json())
        .then((data) => {
            state.recipe = data.data;
            // library.recipes.push(data.data);
            render(state.recipes);
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
if (newRecipeForm) {
    newRecipeForm.addEventListener('submit', addNewRecipe);
}
