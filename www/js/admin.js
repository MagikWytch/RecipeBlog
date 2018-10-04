// ########################################## |
// #            RECIPE                      # |
// ########################################## v

$(document).on('click', '#create_recipe', function () {
    $('.empty-preview').empty()
    $.post('http://localhost:3000/recipes/', (data) => {

        if (data.success) {
            console.log("Recipe created!");
        }
        else {
            console.log("Failed to write to file!")
        }
    });
})

/* // create the new file and add it to the recipes.json
function postARecipe(recipeObj) {
    $.ajax({
        method: 'POST',
        url: '/recipes',
        contentType: 'application/json',
        data: JSON.stringify(recipeObj),
        success: d => console.log("SUCCESS IN POSTING RECIPE?", d)
    });
} */

// cool feature where this code runs on refresh,
// right now the only thing it does is to clear the object...
// could also be used to fetch all the values again on reload
$.get('http://localhost:3000/clear-recipe-object').done(function (data) {
   // some code here
})

$('#category-form').submit((event) => {
    event.preventDefault();
})

// put the name into the object
$('#add_category').on('click', () => {

    let categoryForm = $('#category-form').serialize();

    $.post('http://localhost:3000/add-category', categoryForm)
        .done(function (data) {

            $('.clear-input').val('');
            $('#recipe-category').prop('selectedIndex', 0);
            $('#preview-category').empty()
            if (data) {
                $('#preview-category').append($('<p>' + data + '</p>'));
            }
        });
})

/* $('#portions-form').submit((event) => {
    event.preventDefault();
}) */

/* // put the name into the object
$('#add_portions').on('click', () => {

    let portionsForm = $('#portions-form').serialize();

    $.post('http://localhost:3000/add-portions', portionsForm)
        .done(function (data) {
            $('.clear-input').val('');
            $('#preview-portions').empty()
            if (data.recipeObj) {
                $('#preview-portions').append($('<p>' + data.recipeObj + '</p>'));
            }
        });
}) */

$('#name-form').submit((event) => {
    event.preventDefault();
})

// put the name into the object
$('#add_name').on('click', () => {
    let nameForm = $('#name-form').serialize();

    $.post('http://localhost:3000/add-name', nameForm)
        .done(function (data) {

            $('.clear-input').val('');
            $('#preview-name').empty()
            if (data) {
                $('#preview-name').append($('<p>' + data + '</p>'));
            }
        });
})

$('#instruction-form').submit((event) => {
    event.preventDefault();
})

// put the instruction into the object
$('#add_instruction').on('click', () => {
    let instructionForm = $('#instruction-form').serialize();

    $.post('http://localhost:3000/add-instruction', instructionForm)
        .done(function (data) {



            $('.clear-input').val('');
            $('#preview-instruction').empty()
            if (data.recipeObj) {
                data.recipeObj.forEach(instruction =>
                    $('#preview-instruction').append(
                        $('<li>' + instruction + '</li>')));
            }
        });
})

$('#image-form').submit((event) => {
    event.preventDefault();
})

// put the name into the object
$('#add_image').on('click', () => {
    let imageForm = $('#image-form').serialize();

    $.post('http://localhost:3000/add-image', imageForm)
        .done(function (data) {

            $('.clear-input').val('');
            $('#preview-image').empty()
            if (data) {
                $('#preview-image').append($('<p>' + data + '</p>'));
            }
        });
})

$('#ingredient-form').submit((event) => {
    event.preventDefault();
})

// put the ingredient into the object
$('#add_ingredient').on('click', () => {
    let ingredientForm = $('#ingredient-form').serialize();

    $.post('http://localhost:3000/add-ingredient', ingredientForm)
        .done(function (data) {

            $('.clear-input').val('');
            $('#measure-unit').prop('selectedIndex', 0);
            $('#preview-ingredient').empty()
            if (data.recipeObj) {
                data.recipeObj.forEach(ingredient =>
                    $('#preview-ingredient').append(
                        $('<li>' +
                            ingredient.name + ' ' +
                            ingredient.units + ' ' +
                            ingredient.measuringUnit +
                            '</li>')));
            }
        });
})



// ########################################## |
// #            INGREDIENT                  # |
// ########################################## v

$('#ingredient-name').on('keyup', () => {
    let searchValue = $('#ingredient-name').val();
    getIngredients(searchValue);
})

function getIngredients(searchValue) {
    $('#display-ingredients').empty();

    $.get('http://localhost:3000/ingredients/' + searchValue, (data) => {


        if (data.error) {
            $('#display-ingredients').append(` <p> Skriv minst 2 bokstäver </p> `);
        }
        else if (data.length === 0) {
            $('#display-ingredients').append(` <p> Det du sökte på kunde inte hittas </p> `);
        }
        else {
            addIngredients(data)
        }
    });
}

function addIngredients(ingredient) {

    // $('#display-ingredients').append(`<li class="list-group-item">${ingredient}</li>`);
    let ul = $('<ul></ul>');
    ul.addClass('ingredient-list');

    for (let name of ingredient) {

        let li = $('<li></li>');
        let a = $('<a href="#"></a>');
        a.text(name);
        li.append(a);
        ul.append(li);
    }

    $('#display-ingredients').append(ul);
}

$(document).off('click', 'ul.ingredient-list a');
$(document).on('click', 'ul.ingredient-list a', function () {
    let value = this.text;

    $('#display-recipe-result').empty();
    $('ul.ingredient-list').remove();
    $('#ingredient-name').val(value);
});
