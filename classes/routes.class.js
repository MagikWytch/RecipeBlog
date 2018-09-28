// const Recipe = require('./recipe.class');

const fs = require('fs');
const path = require('path');
const recipePath = path.join(__dirname, '../json/recipes.json');
let recipes = require(recipePath);

module.exports = class Routes {

  constructor(app, nutrients) {
    this.app = app;
    this.nutrients = nutrients;
    this.setRoutes();
  }

  setRoutes() {


   // Recipes
    this.app.get('/recipes', (req, res) => {
      res.json({ error: 'Please provide at least two characters...' });
    });

     // find all recipes matching the word the user wrote
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
        );
        res.json(result);
      }
    );

    // find recipe by exact name and return it
    this.app.get(
      '/recipe-by-name/:name',
      async (req, res) => {
        let value = req.params.name.toLowerCase();
        if (value.length === 0) {
          res.json({ error: 'No recipe name' });
          return;
        }
       
        //
        // function process(callback) {
        //   let x = bla()
        //   let y = bloo()

        //   let addedValue = x + y

        //   // Now I'm done with my processing, let's inform the users that we are done -- WE CALL BACK HOME!
        //   callback(addedValue);
        // }

        // function printValue(value) {
        //   console.log('WE ARE DONE, WE GOT VALUE' + value)
        // }

        // process(printValue);

        // Array.prototype.find = function find(callback) {
        //   for(var i = 0; i < this.values.length; i++) {
        //     if (callback(this.values[i])) {
        //       return this.values[i];
        //     }
        //   }

        //   return undefined;
        // }

        // [1,2,3,54,56].find((x) => true);

        let recipe = recipes.find((recipe) => recipe.name.toLowerCase().includes(value));
        res.json(recipe);
      }
    );

    // post new recipe
    this.app.post('/recipes', (req, res) => {
      recipes = require(recipePath);
      recipes.push(req.body);
      fs.writeFile(recipePath, JSON.stringify(recipes, null, '  '), error => {
        console.log(error);
        res.json({ success: !error })
      });
    });


    // ingredients
    this.app.get('/ingredients', (req, res) => {
      res.json({ error: 'Please provide at least two characters...' });
    });

    // auto complete ingredient name and return what was found
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

  }

}