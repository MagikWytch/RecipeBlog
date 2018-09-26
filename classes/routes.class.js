// const Recipe = require('./recipe.class');

const fs = require('fs');
const recipePath = '../json/recipes.json';
const recipes = require(recipePath);

module.exports = class Routes {

  constructor(app, nutrients) {
    this.app = app;
    this.nutrients = nutrients;
    this.setRoutes();
  }

  setRoutes() {

    this.app.get('/recipes', (req, res) => {
      res.json({ error: 'Please provide at least two characters...' });
    });
    this.app.get(
      '/recipes/:partOfRecipeName',
      async (req, res) => {
        let value = req.params.partOfRecipeName.toLowerCase();

        if (value.length < 2) {
          res.json({ error: 'Please provide at least two characters...' });
          return;
        }

        let result = recipes.filter(
          recipe => recipe.name.toLowerCase().includes(value)
        ).map(
          recipe => recipe
        );
        res.json(result);
      }
    );


    this.app.get(
      '/ingredients/:startOfName',
      (req, res) => {

        let start = req.params.startOfName.toLowerCase();

        if (start.length < 2) {
          res.json({ error: 'Please provide at least two characters...' });
          return;
        }

        let result = this.nutrients.filter(
          nutrient => nutrient.Namn.toLowerCase().indexOf(start) == 0
        ).map(
          nutrient => nutrient.Namn
        );
        res.json(result);
      }
    );


    this.app.get(
      '/admin',
      (req, res) => {

      })




  }

}