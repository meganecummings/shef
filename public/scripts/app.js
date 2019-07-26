console.log('Chef, enter your recipe')

// ----------------- CONSTANT VARIABLES ------------------ //
const BASE_URL = ('/api/newrecipe');
const LIB_URL = ('/api/recipes');
const navLinks = document.querySelectorAll('nav li');
const form = document.querySelector('form');

// ------------------- GLOBAL VARIABLES -------------------- //

// ------------------- STATE VARIABLES -------------------- //

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
const mainContainerR = document.getElementById('mainContainerR');
const $mainContainerR = $('#mainContainerR');
const ingredientList = document.getElementsByClassName('ingredientList');
const card = document.getElementsByClassName('card');

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
    return `
    <div class="card" id="${recipe._id}">
        <div class="img-container">
            <img src="${recipe.image}" class="card-img" name="image" alt="${recipe.name} Image"/>
        </div>
        <div class="card-body">
            <div class="card-header">${recipe.name}</div>
            <p class="ingredients">${recipe.ingredients}</p>
            <p class="procedure">${recipe.procedure}</p>
            <button class="delete-button btn">Delete</button>
            <button class="edit-button btn">Edit</button>
        </div>
    </div>
    `
}

const libTemplate = (recipe) => {
    return `
    <div class="card individualRecipe" id="${recipe._id}">
        <div class="img-container">
            <img src="${recipe.image}" class="card-img" name="image" alt="${recipe.name} Image"/>
        </div>
        <div class="card-body">
            <div class="card-header">${recipe.name}</div>
        </div>
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
    const image = document.getElementById('image');
    const newRecipe = ({ name: name.value, ingredients: ingredients.value, procedure: procedure.value, image: image.value });
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
            render(state.recipes);
            name.value = '';
            ingredients.value = '';
            procedure.value = '';
            image.value = '';
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
    const recipeImage = event.target.parentNode.children[3].src;
    event.target.parentNode.innerHTML = `
    <div class="form-style">
        <h1>Edit ${recipeName}</h1>
        <form>
            <input type="text" id="editRecipeName" name="name" value="${recipeName}" />
            <input type="text" id="editRecipeIngredients" name="ingredients" value="${recipeIngredients}" />
            <input type="text" id="editRecipeProcedure" name="procedure" value="${recipeProcedure}" />
            <div>
            <input type="text" id="editRecipeImage" name="image" value="${recipeImage}" />
            </div>
            <button type="button" class="cancel-edit btn">Cancel</button>
            <button type="submit" class="submit-edit btn">Submit</button>
        </form>
    </div>
    `
};




const updateRecipe = (event) => {
    const recipeId = event.target.parentNode.parentNode.id;
    const recipeName = document.getElementById('editRecipeName').value;
    const recipeIngredients = document.getElementById('editRecipeIngredients').value;
    const recipeProcedure = document.getElementById('editRecipeProcedure').value;
    const recipeImage = document.getElementById('editRecipeImage').value;
    const updatedRecipe = { name: recipeName, ingredients: recipeIngredients, procedure: recipeProcedure, image: recipeImage };
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

$recipesLibrary.on('click', '.individualRecipe', (e) => {
    const $recipeId = ($(e.target).parent().parent().attr('id'));
    for (let i = 0; i < state.recipes.length; i++) {
        if ($recipeId === state.recipes[i]._id) {
            console.log(`Yay we found ${state.recipes[i].name}`);
            $mainContainerR.empty();
            $mainContainerR.append(`
            <section id="recipesSection">    
                <div id="${state.recipes[i]._id}">
                    <h4>${state.recipes[i].name}</h4>
                    <h6>Ingredients</h6>
                    <p class="ingredients">${state.recipes[i].ingredients}</p>
                    <h6>Procedure</h6>
                    <p class="procedure">${state.recipes[i].procedure}</p>
                    <img src="${state.recipes[i].image}" id="${state.recipes[i]._id}/image" name="image" alt="${state.recipes[i].name} Image"/>
                    <button class="delete-button btn">Delete</button>
                    <button class="edit-button btn">Edit</button>
                </div>
            </section>
           `);
        };
    };
})

// --------------------- INDIVDUAL RECIPE CRUD ---------------------- //

const handleRecipesSectionClick2 = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('edit-button')) {
        editRecipe2(event);
    };
    if (event.target.classList.contains('delete-button')) {
        deleteRecipe2(event);
    };
    if (event.target.classList.contains('cancel-edit')) {
        window.location.replace(`/recipes`);
    };
    if (event.target.classList.contains('submit-edit')) {
        updateRecipe2(event);
    };
};

const editRecipe2 = (event) => {
    const recipeName = event.target.parentNode.children[0].innerText;
    const recipeIngredients = event.target.parentNode.children[1].innerText;
    const recipeProcedure = event.target.parentNode.children[2].innerText;
    const recipeImage = event.target.parentNode.children[5].src;
    event.target.parentNode.innerHTML = `
    <div class="form-style">
    <h1>Edit ${recipeName}</h1>
        <form>
            <input type="text" id="editRecipeName" name="name" value="${recipeName}" />
            <input type="text" id="editRecipeIngredients" name="ingredients" value="${recipeIngredients}" />
            <input type="text" id="editRecipeProcedure" name="procedure" value="${recipeProcedure}" />
            <input type="text" id="editRecipeImage" name="image" value="${recipeImage}"/>
            <button type="button" class="cancel-edit btn">Cancel</button>
            <button type="submit" class="submit-edit btn">Submit</button>
        </form>
    </div>
    `;
};

const updateRecipe2 = (event) => {
    const recipeId = event.target.parentNode.parentNode.parentNode.id;
    const recipeName = document.getElementById('editRecipeName').value;
    const recipeIngredients = document.getElementById('editRecipeIngredients').value;
    const recipeProcedure = document.getElementById('editRecipeProcedure').value;
    const recipeImage = document.getElementById('editRecipeImage').value;
    const updatedRecipe = { name: recipeName, ingredients: recipeIngredients, procedure: recipeProcedure, image: recipeImage };

    fetch(`${BASE_URL}/${recipeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRecipe),
        })
        .then(res => res.json())
        .then(() => {
            window.location.replace(`/recipes`);
        })
        .catch((error) => console.log(error))
}

const deleteRecipe2 = (event) => {
    const recipeId = event.target.parentNode.id;
    fetch(`${BASE_URL}/${recipeId}`, {
            method: 'delete'
        })
        .then((res) => res.json())
        .then(() => {
            window.location.replace(`/recipes`);
        })
        .catch((err) => console.log(err))
};

if (mainContainerR) {
    mainContainerR.addEventListener('click', handleRecipesSectionClick2);
}

//ADD ERROR MESSAGES ON SUBMIT
form && form.addEventListener('submit', (e) => {
    [...document.querySelectorAll(`.alert`)].forEach(alert => {
        alert.parentNode.removeChild(alert);
    });
    [...form.elements].forEach(input => {
        if (input.type !== 'submit' && input.value === '') {
            e.preventDefault();
            input.classList.add('input-error');
            input.insertAdjacentHTML('afterend', `
                <div class="alert alert-${input.id}">
                    Please Enter ${input.placeholder}
                </div>
            `);
        }
    });
});

// CLEAR FORM ERRORS ON FOCUS
document.addEventListener('focus', (e) => {
    e.target.classList.remove('input-error');
    const inputMessage = document.querySelector(`.alert-${e.target.id}`);
    inputMessage && inputMessage.parentNode.removeChild(inputMessage);
}, true)