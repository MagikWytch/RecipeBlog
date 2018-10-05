let ingredientList;
let nutritionList;

$('#recipe-search-value').on('keyup', (e) => {
    getRecipeValue();
})

$('.form-inline').submit((event) => {
    event.preventDefault();
})

function getRecipeValue() {
    getRecipes($('#recipe-search-value').val());
}

function getRecipes(valueToSearchFor) {
    $.get('http://localhost:3000/recipes/' + valueToSearchFor, (data) => {
        $('#filter-buttons').show();
        $('#display-recipe-result').removeClass('container');
        $('#display-recipe-result').addClass('card-columns');
        $('#display-recipe-result').empty();

        if (data.error) {
            $('#display-recipe-result').append(` <p> Skriv minst 2 bokstäver </p> `);
        } else if (data.length === 0) {
            $('#display-recipe-result').append(` <p> Det du sökte på kunde inte hittas </p> `);
        } else {
            addRecipes(data);
        }
    });
}

function createNewCard(recipe) {
    let card = $(`
    <a href="#">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${recipe.urlToImg}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${recipe.name}</h5>
                <p class="card-text">${recipe.category}</p>
            
            </div>
        </div>
    </a>`);

    card.on('click', () => {
        getOneRecipe(recipe.name);
    })

    return card;
}

function addRecipes(recipes) {

    for (let recipe of recipes) {
        let newCard = createNewCard(recipe);
        $('#display-recipe-result').append(newCard);

    }
}

function getOneRecipe(name) {
    $.get('http://localhost:3000/recipe-by-name/' + name, (recipe) => {

        ingredientList = recipe.ingredients;
        nutritionList = recipe.nutrition;

        addOneRecipe(recipe);
    })
}

function addOneRecipe(recipe) {

    let row = $('<div class="row"></div>');
    $('#display-recipe-result').empty();
    $('#filter-buttons').hide();
    $('#display-recipe-result').removeClass('card-columns');
    $('#display-recipe-result').addClass('container');
    $('#display-recipe-result').append(row);

    createDetails(recipe);
    createNutritions(recipe);

    let backButton = $('<a href="#" class="btn btn-primary">Tillbaka</a>');
    backButton.on('click', () => {
        $('#display-recipe-result').removeClass('container');
        $('#display-recipe-result').addClass('card-columns');
        $('#display-recipe-result').empty();
        getRecipeValue();
    });
    $('#leftColumn').append(backButton);
}

function createDetails(recipe) {

    let details = $(`
    <div id="leftColumn" class="col-sm-8">

        <div class="container">
            <h2>${recipe.name}</h2>    
            <p class="text-muted">${recipe.category}</p>
            <img id="recipe-image" src="${recipe.urlToImg}"></img>
        </div>
       
        <h6>Antal portioner: </h6>
        <div class="container">
            <select id="portions" name="portions">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>

        <h6>Ingredienser</h6>
        <ul id="ingredients"></ul>
        <h6>Instruktioner</h6>
        <ol id="instructions"></ol>
    </div>`);

    $('div.row').append(details);

    recipe.ingredients.forEach((ingredient) => {
        let ingredientLi = $('<li></li>');
        ingredientLi.text(ingredient.name + ' ' + ingredient.units + ' ' + ingredient.measuringUnit);
        $('#ingredients').append(ingredientLi);
    })

    recipe.instructions.forEach((instruction) => {
        let instructionLi = $('<li></li>');
        instructionLi.text(instruction);
        $('#instructions').append(instructionLi);
    })
}

function createNutritions(recipe) {
    let nutrition = $(`
    <div class="col-sm-4">
        <h5>Näringsinnehåll per portion</h5>
        <div class="card">
            <div class="card-body">
                <p>Energi (kcal): ${parseFloat(recipe.nutritions['Energi (kcal)']).toFixed(2).replace(".", ",")} g</p>   
                <p>Protein: ${parseFloat(recipe.nutritions['Protein']).toFixed(2).replace(".", ",")} g</p>  
                <p>Kolhydrat: ${parseFloat(recipe.nutritions['Kolhydrater']).toFixed(2).replace(".", ",")} g</p>  
                <p>Socker: ${parseFloat(recipe.nutritions['Socker totalt']).toFixed(2).replace(".", ",")} g</p>  
                <p>Omättat fett: ${parseFloat(recipe.nutritions['Summa mättade fettsyror']).toFixed(2).replace(".", ",")} g</p>  
                <p>Omättat fett:  ${parseFloat(recipe.nutritions['Summa enkelomättade fettsyror']).toFixed(2).replace(".", ",")} g</p>  
                <p>Fleromättat fett:  ${parseFloat(recipe.nutritions['Summa fleromättade fettsyror']).toFixed(2).replace(".", ",")} g</p>  
                <p>Salt: ${parseFloat(recipe.nutritions['Salt']).toFixed(2).replace(".", ",")} g</p> 
            </div>
        </div>    
    </div>`);

    $('div.row').append(nutrition);
}

$(document).on('change', '#portions', function () {
    $('#ingredients').empty();
    var portions = $(this).val();

    ingredientList.forEach((ingredient) => {
        let ingredientLi = $('<li></li>');
        ingredientLi.text(ingredient.name + ' ' + parseFloat(ingredient.units * portions) + ' ' + ingredient.measuringUnit);
        $('#ingredients').append(ingredientLi);
    })
})

$('#filter-buttons input').on('click', function () {
    if ($(this).val().toLowerCase() === 'visa alla') {
        getAllRecipes();
    }
    let category = $(this).val().toLowerCase();
    getRecipeByTag(category);
})

function getRecipeByTag(category) {
    $.get('http://localhost:3000/recipes-by-tag/' + category, (data) => {

        $('#display-recipe-result').removeClass('container');
        $('#display-recipe-result').addClass('card-columns');
        $('#display-recipe-result').empty();

        addRecipes(data);

    });

}
/* 
function getAllRecipes(){
    $.get('http://localhost:3000/get-all-recipes/', (data) => {

        $('#display-recipe-result').removeClass('container');
        $('#display-recipe-result').addClass('card-columns');
        $('#display-recipe-result').empty();

        addRecipes(data);

    });
} */


