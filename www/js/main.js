$('#search').on('click keypress', () => {
    console.log(event)
    let valueToSearchFor = $('#search-value').val();
    $('#search-value').empty();
    getRecipes(valueToSearchFor)
    
})

function getRecipes(valueToSearchFor) {
    $.get('http://localhost:3000/recipes/' + valueToSearchFor, (data) => {
        data.forEach(addRecipes);
    });
}

function addRecipes(recipe) {
    $('#display-result').empty();
    $('#display-result').append(`<h4> ${recipe.name} </h4>`);
}