$('#search').click(() => {
    let valueToSearchFor = $('#search-value').val();
    getRecipes(valueToSearchFor)
})

function getRecipes(valueToSearchFor) {
    $.get('http://localhost:3000/recipes/' + valueToSearchFor, (data) => {
        data.forEach(addRecipes);
    });
}

function addRecipes(recipeName) {
    $('#display-result').empty();
    $('#display-result').append(`<h4> ${recipeName} </h4>`);
}