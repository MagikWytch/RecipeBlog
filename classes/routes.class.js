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

    this.app.get('/recipe/:name', (req, res) => {


    })

    this.app.post('/recipes', (req, res) => {
      recipes = require(recipePath);
      recipes.push(req.body);
      fs.writeFile(recipePath, JSON.stringify(recipes, null, '  '), error => {
        console.log(error);
        res.json({ success: !error })
      });
    });


    this.app.get('/ingredients', (req, res) => {
      res.json({ error: 'Please provide at least two characters...' });
    });

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