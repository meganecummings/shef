console.log('Hey there!');
console.log($);


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
const recipeSection = document.getElementById('recipeSection');
const $recipesLibrary = $('#recipesLibrary');
const $mainContainerR = $('#mainContainerR');
// const editBtns = document.getElementsByClassName('edit-btns');

// ------------------- FUNCTIONS -------------------- //

const render = () => {
    recipesSection.innerHTML = '';
    const template = recipeTemplate(state.recipe);
    recipesSection.insertAdjacentHTML('afterbegin', template);
}

const renderRecipe = () => {
    recipeSection.innerHTML = '';
    const template = recipeTemplate(state.recipes);
    recipeSection.insertAdjacentHTML('afterbegin', template);
}

const renderLib = () => {
    recipesLibrary.innerHTML = '';
    state.recipes.forEach(data => {
        const template = libTemplate(data);
        recipesLibrary.insertAdjacentHTML('afterbegin', template);
    });
}


const recipeTemplate = (recipe) => {
    console.log(recipe);
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
    <div id="${recipe._id}" class="individualRecipe">
    <h4>${recipe.name}</h4>
    </div>
    `
}

const getRecipe = () => {
    fetch(LIB_URL)
        .then((res) => res.json())
        .then(json => {
            state.recipes = json.data;
            renderRecipe(state.recipes);
        })
        .catch((err) => console.log({ err }));
}

if (recipeSection) {
    getRecipe();
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

const updateRecipe = (event) => {
    const recipeId = event.target.parentNode.parentNode.id;
    const recipeName = document.getElementById('editRecipeName').value;
    const recipeIngredients = document.getElementById('editRecipeIngredients').value;
    const recipeProcedure = document.getElementById('editRecipeProcedure').value;
    const updatedRecipe = { name: recipeName, ingredients: recipeIngredients, procedure: recipeProcedure };
    console.log(recipeId);
    fetch(`${BASE_URL}/${recipeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecipe),
    })
        .then(res => res.json())
        .then((data) => {
            state.recipe = data.data;
            render(state.recipes)
        })
        .catch((error) => console.log(error))
}


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
        console.log(event);
        editRecipe(event);
    };
    if (event.target.classList.contains('delete-button')) {
        console.log(event);
        deleteRecipe(event);
    };
    if (event.target.classList.contains('cancel-edit')) {
        render(state.recipe);
    };
    if (event.target.classList.contains('submit-edit')) {
        updateRecipe(event);
    };
};

// ------------------- EVENT LISTENERS -------------------- //
if (newRecipeForm) {
    newRecipeForm.addEventListener('submit', addNewRecipe);
};

if (recipesSection) {
    recipesSection.addEventListener('click', handleRecipesSectionClick);
};

// if (editBtns) {
//     editBtns.addEventListener('click', handleRecipesSectionClick);
// }

$recipesLibrary.on('click', '.individualRecipe', (e) => {
    const $recipeId = ($(e.target).parent().attr('id'));
    // console.log($recipeId);
    // console.log(state.recipes);
    for (let i = 0; i < state.recipes.length; i++) {
        if ($recipeId === state.recipes[i]._id) {
            console.log(`Yay we found ${state.recipes[i].name}`);
            $mainContainerR.empty();
            $mainContainerR.append(`
                <div id="${state.recipes[i]._id}">
                    <h4>${state.recipes[i].name}</h4>
                    <p class="ingredients">${state.recipes[i].ingredients}</p>
                    <p class="procedure">${state.recipes[i].procedure}</p>
                    <section class="recipesSection">
                    <button class="delete-button">Delete</button>
                    <button class="edit-button">Edit</button>
                    </section>
                </div>
                `);
        };
    };

    //    
})