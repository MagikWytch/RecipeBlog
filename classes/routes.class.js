const Recipe = require('./recipe.class');

module.exports = class Routes {


  constructor(app, foodData) {
    this.app = app;
    this.foodData = foodData;
    this.setRoutes();
  }

  setRoutes() {

    this.app.get(
      '/recipes/:partOfRecipeName',
      async (req, res) => {
        let value = req.params.partOfRecipeName.toLowerCase();

        if (value.length < 2) {
          res.json({ error: 'Please provide at least two characters...' });
          return;
        }

        let recipes = require('../json/recipes/recipes.json') || [];
        
        recipes = recipes.filter((recipe) =>{
          return recipe.name.toLowerCase().includes(value)
        })
        .map((recipe)=>{
          return recipe.name
        });

        res.json(recipes);
      }
    );



  }

}