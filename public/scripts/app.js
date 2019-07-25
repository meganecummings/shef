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

// // ADD NAV ACTIVE CLASS
// navLinks.forEach(link => {
//     // console.log(link.firstChild.getAttribute('href'));
//     // console.log(window.location.pathname);
//     if (window.location.pathname === link.firstChild.getAttribute('href')) {
//         link.classList.add('active');
//     }
// })

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

$recipesLibrary.on('click', '.individualRecipe', (e) => {
    const $recipeId = ($(e.target).parent().attr('id'));
    // console.log($recipeId);
    // console.log(state.recipes);
    for (let i = 0; i < state.recipes.length; i++) {
        if ($recipeId === state.recipes[i]._id) {
            console.log(`Yay we found ${state.recipes[i].name}`);
            $mainContainerR.empty();
            $mainContainerR.append(`
            <section id="recipesSection">    
                <div id="${state.recipes[i]._id}">
                    <h4>${state.recipes[i].name}</h4>
                    <p class="ingredients">${state.recipes[i].ingredients}</p>
                    <p class="procedure">${state.recipes[i].procedure}</p>
                    <button class="delete-button">Delete</button>
                    <button class="edit-button">Edit</button>
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
        console.log(event.target);
        editRecipe2(event);
    };
    if (event.target.classList.contains('delete-button')) {
        console.log(event);
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

const updateRecipe2 = (event) => {
    const recipeId = event.target.parentNode.parentNode.id;
    const recipeName = document.getElementById('editRecipeName').value;
    const recipeIngredients = document.getElementById('editRecipeIngredients').value;
    const recipeProcedure = document.getElementById('editRecipeProcedure').value;
    const updatedRecipe = { name: recipeName, ingredients: recipeIngredients, procedure: recipeProcedure };
    
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
    console.log(recipeId);
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
    // e.preventDefault();
    // const formInputs = [...form.elements];
    // console.log(formInputs);
    [...form.elements].forEach(input => {
        if (input.type !== 'submit' && input.value === '') {
            // console.log('click')
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

// //VALIDATE FORM INPUT ON BLUR
// document.addEventListener('blur', (e) => {
//     if (e.target.value === '') {
//         e.target.classList.add('input-error');
//         e.target.insertAdjacentHTML('afterend', `
//                 <div class="alert alert-${e.target.id}">
//                     Please Enter ${e.target.placeholder}
//                 </div>
//             `);
//     }
// }, true);


// // CLEAR FORM ERRORS ON FOCUS
// document.addEventListener('focus', (e) => {
//     e.target.classList.remove('input-error');
//     const inputMessage = document.querySelector(`.alert-${e.target.id}`);
//     inputMessage && inputMessage.parentNode.removeChild(inputMessage);
// }, true)