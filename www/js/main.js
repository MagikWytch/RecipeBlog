// Recipe functionality

// listeners
$('#search-recipe').on('click', () => { getRecipeValue(); });
$('#recipe-search-value').on('keyup', (e) => {
    if (e.keyCode == 13) { getRecipeValue(); }
})

function getRecipeValue() {
    getRecipes($('#recipe-search-value').val());
}

function getRecipes(valueToSearchFor) {
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
        a.text(recipe);
        a.data('recipeObject', recipe);
        li.append(a);
        ul.append(li);
    }

    $('#display-recipe-result').append(ul);
}

// click on a recipe in the list
$(document).off('click', 'ul.recipes a');
$(document).on('click', 'ul.recipes a', function () {

    let r = $(this);
    displayRecipeInfo(r.data('recipeObject'));
});

function displayRecipeInfo(recipe) {
    let recipeInfo = $('<section></section>');
    recipeInfo.addClass('recipe-info');

    for (let propertyName in recipe) {

        console.log(propertyName);

        let val = recipe[propertyName];

        let h3 = $('<h3></h3>');
        h3.text(propertyName[0].toUpperCase() + propertyName.substr(1));

        let p = $('<p></p>');
        p.text(val);
        recipeInfo.append(h3).append(p);
    }

    $('#display-recipe-result').remove();
    $('section.person-info').remove();
    $('body').append(recipeInfo);
}

function createNewRecipe() {
    // I want to make a new recipe here that I can send 
    // as a completely new, temporary object to postARecipe.
    // I need to check so that it contains what I want and
    // also make an object design to put it in.
    // It will be created from the inputs in the admin-html 
}

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



