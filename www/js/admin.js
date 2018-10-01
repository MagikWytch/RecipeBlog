// ########################################## |
// #            RECIPE                      # |
// ########################################## v
function createRecipeObject() {

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
////////////////////////////////////////////////////////////////////
/* $.get('http://localhost:3000/fetch-name').done(function (name) {
    console.log('Fetched ', name, ' from server');

    $('#preview-name').empty();

    if (name) {
        $('#preview-name').append($('<p>' + name + '</p>'));
    }
}) */

$('#add_name').on('click', () => {
    console.log('CLICKED');

    let nameForm = $('#name-form').serialize();

    $.post('http://localhost:3000/add-name', nameForm)
        .done(function (data) {

            $('#preview-name').empty()
            if (data) {
                $('#preview-name').append($('<p>' + data + '</p>'));
            }
        });
})

$('#add_ingredient').on('click', () => {
    console.log('CLICKED');

    let ingredientForm = $('#ingredient-form').serialize();
    console.log(ingredientForm);

    $.post('http://localhost:3000/add-ingredient', ingredientForm)
        .done(function (data) {

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
////////////////////////////////////////////////////////////////

$('#ingredient-form').submit((event) => {
    event.preventDefault();
})
$('#name-form').submit((event) => {
    event.preventDefault();
})
$('#ingredient-form').submit((event) => {
    event.preventDefault();
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
