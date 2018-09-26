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
            alert('Skriv in minst 2 bokstäver');
        }
        else if(data.length === 0){
            alert('Finns ej');
        }
        else {
            addRecipes(data);
        }
    });

}

function addRecipes(recipes) {

    let ul = $('<ul></ul>');

    for (let recipe of recipes) {

        let li = $('<li></li>');
        let a = $('<a href="#"></a>');
        a.text(recipe.name);
        li.append(a);
        ul.append(li);
    }

    $('#display-recipe-result').append(ul);
}


// Ingredient functionality 

// listeners
$('#search-ingredient').on('click', getIngredientValue);
$('#ingredient-search-value').on('keyup', (e) => {
    if (e.keyCode == 13) { getIngredientValue(); }
})

function getIngredientValue() {
    getIngredients($('#ingredient-search-value').val())
}

function getIngredients(valueToSearchFor) {
    $('#display-ingredient-result').empty();
    if (valueToSearchFor.length > 1) {
        $.get('http://localhost:3000/ingredients/' + valueToSearchFor, (data) => {
            $('#display-ingredient-result').empty();
            addIngredients(data)
        });
    }
    else {
        $('#display-ingredient-result').append(` <p> Sökningen gav inga resultat, " ${valueToSearchFor} "! </p> `);
        return;
    }
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

