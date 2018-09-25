// Recipe stuff

// listeners
$('#search-recipe').on('click', getRecipeValue);
$('#recipe-search-value').on('keyup', (e) => {
    if (e.keyCode == 13) { getRecipeValue(); }
})

function getRecipeValue() {
    getRecipes($('#recipe-search-value').val());
}

function getRecipes(searchValue) {
    if (!searchValue) return;
    $.get('http://localhost:3000/recipes/' + searchValue, (data) => {
        $('#display-recipe-result').empty();
        data.forEach(addRecipes);
    });
}

function addRecipes(recipe) {
    $('#display-recipe-result').append(` <h4> <a href="#"> ${recipe.name} </a> </h4> `);
}


// Ingredient stuff

// listeners
$('#search-ingredient').on('click', getIngredientValue);
$('#ingredient-search-value').on('keyup', (e) => {
    if (e.keyCode == 13) { getIngredientValue(); }
})

function getIngredientValue() {
    getIngredients($('#ingredient-search-value').val())
}

function getIngredients(searchValue) {
    if (!searchValue) return;
    $.get('http://localhost:3000/ingredients/' + searchValue, (data) => {
        $('#display-ingredient-result').empty();
        data.forEach(addIngredients);
    });
}

function addIngredients(ingredientName) {
    $('#display-ingredient-result').append(` <h4> <a href="#"> ${ingredientName} </a> </h4> `);
}

