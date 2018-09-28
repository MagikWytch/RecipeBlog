// Recipe functionality
// this looks very messy, i might want 
// to split the code into new .js files
// or find a way to reuse the same
// functions, Recipe.class might not
// have been a bad idea

// recipe search box listeners
// old school style enter or click
$('#search-recipe').on('click', () => { getRecipeValue(); });
$('#recipe-search-value').on('keyup', (e) => {
    if (e.keyCode == 13) { getRecipeValue(); }
})

function getRecipeValue() {
    getRecipes($('#recipe-search-value').val());
}

function getRecipes(valueToSearchFor) {
    $('section.person-info').remove();
    $('#display-recipe-result').empty();

    $.get('http://localhost:3000/recipes/' + valueToSearchFor, (data) => {

        if (data.error) {
            $('#display-recipe-result').append(` <p> Skriv minst 2 bokstäver </p> `);
        }
        else if (data.length === 0) {
            $('#display-recipe-result').append(` <p> Det du sökte på kunde inte hittas </p> `);
        }
        else {
            addRecipes(data);
        }
    });
}

function addRecipes(recipes) {

    let ul = $('<ul></ul>');
    ul.addClass('recipes');

    for (let recipe of recipes) {

        let li = $('<li></li>');
        let a = $('<a href="#"></a>');
        a.text(recipe.name);
        li.append(a);
        ul.append(li);
    }

    $('#display-recipe-result').append(ul);
}

// recipe list Listener
// keyup function only
$(document).off('click', 'ul.recipes a');
$(document).on('click', 'ul.recipes a', function () {
    let value = this.text;
    getOneRecipe(value);
});

function getOneRecipe(name) {
    $.get('http://localhost:3000/recipe-by-name/' + name, (recipe) => {

        addOneRecipe(recipe);
    })
}

function addOneRecipe(recipe) {
    let recipeInfo = $('<section></section>');
    recipeInfo.addClass('recipe-info');

    let title = $('<h5></h5>');
    title.text(recipe.name);
    recipeInfo.append(title);

    let unorderedList = $('<ul></ul>');
    recipeInfo.append(unorderedList);
    recipe.ingredients.forEach((ingredient) => {
        let ingredientLi = $('<li></li>');
        ingredientLi.text(ingredient.name + ' ' + ingredient.units + ' ' + ingredient.measuringUnit);
        unorderedList.append(ingredientLi);
    })

    let orderedList = $('<ol></ol>');
    recipeInfo.append(orderedList);
    recipe.instructions.forEach((instruction) => {
        console.log(instruction);
        let instructionLi = $('<li></li>');
        instructionLi.text(instruction);
        orderedList.append(instructionLi);
    })

    $('#display-recipe-result').empty();
    $('section.recipe-info').remove();
    $('#display-recipe-result').append(recipeInfo);
}

function createNewRecipe() {

    let recipeObj = {


    }
    // I want to make a new recipe here that I can send 
    // as a completely new, temporary object to postARecipe.
    // I need to check so that it contains what I want and
    // also make an object design to put it in.
    // It will be created from the inputs in the admin-html 
}

// create the new file and add it to the recipes.json
function postARecipe(recipeObj) {
    $.ajax({
        method: 'POST',
        url: '/recipes',
        contentType: 'application/json',
        data: JSON.stringify(recipeObj),
        success: d => console.log("SUCCESS IN POSTING RECIPE?", d)
    });
}


// Ingredient functionality 

// listeners
$('#ingredient-search-value').on('keyup', () => {
    let searchValue = $('#ingredient-search-value').val();
    getIngredients(searchValue);
})

/* function getIngredientValue() {
    getIngredients($('#ingredient-search-value').val())
} */

function getIngredients(searchValue) {
    $('#display-ingredient-result').empty();

    $.get('http://localhost:3000/ingredients/' + searchValue, (data) => {


        if (data.error) {
            $('#display-ingredient-result').append(` <p> Skriv minst 2 bokstäver </p> `);
        }
        else if (data.length === 0) {
            $('#display-ingredient-result').append(` <p> Det du sökte på kunde inte hittas </p> `);
        }
        else {
            addIngredients(data)
        }
    });
}

function addIngredients(ingredient) {
    let ul = $('<ul></ul>');

    for (let name of ingredient) {

        let li = $('<li></li>');
        let a = $('<a href="#"></a>');
        a.text(name);
        li.append(a);
        ul.append(li);
    }

    $('#display-ingredient-result').append(ul);
}



