console.log('Hey there!');


// ----------------- CONSTANT VARIABLES ------------------ //
const BASE_URL = ('/api/newrecipe');
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
        const template = libTemplate(data);
        recipesLibrary.insertAdjacentHTML('afterbegin', template);
    });
}


const recipeTemplate = (recipe) => {
    return `
    <div id="${recipe._id}">
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
if (recipesLibrary) {
    getAllRecipes();
};

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

const editRecipe = (event) => {
    const recipeName = event.target.parentNode.children[0].innerText;
    const recipeIngredients =
        event.target.parentNode.children[1].innerText;
    const recipeProcedure = event.target.parentNode.children[2].innerText;
    event.target.parentNode.innerHTML = `
    <h4>Edit ${recipeName}</h4>
    <form>
        <div>
            <label style="display:block;" for="recipeName">Recipe Name</label>
            <input type="text" id="editRecipeName" name="name" value="${recipeName}"/>
        </div>
        <div>
            <label style="display:block;" for="recipeIngredients">Recipe Ingredients</label>
            <input type="text" id="editRecipeIngredients" name="ingredients" value="${recipeIngredients}"/>
        </div>
        <div>
            <label style="display:block;" for="recipeProcedure">Recipe Procedure</label>
            <input type="text" id="editRecipeProcedure" name="procedure" value="${recipeProcedure}"/>
        </div>
        <button type="button" class="cancel-edit">Cancel</button>
        <button type="submit" class="submit-edit">Submit</button>
    </form>
    `;
};


const deleteRecipe = (event) => {
    const recipeId = event.target.parentNode.id;
    console.log(recipeId);
    fetch(`${BASE_URL}/${recipeId}`, {
        method: 'delete'
    })
        .then((response) => response.json())
        .then(recipesSection.innerHTML = '')
        .catch((err) => console.log(err))
};

const handleRecipesSectionClick = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('edit-button')) {
        editRecipe(event);
    };
    if (event.target.classList.contains('delete-button')) {
        deleteRecipe(event);
    };
    if (event.target.classList.contains('cancel-edit')) {
        render(state.recipe);
    };
}


// ------------------- EVENT LISTENERS -------------------- //
if (newRecipeForm) {
    newRecipeForm.addEventListener('submit', addNewRecipe);
};

if (recipesSection) {
    recipesSection.addEventListener('click', handleRecipesSectionClick);
};