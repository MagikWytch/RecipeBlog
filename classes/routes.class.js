const fs = require('fs');
const path = require('path');
const recipePath = path.join(__dirname, '../json/recipes.json');
let recipes = require(recipePath);

module.exports = class Routes {



  constructor(app, nutrients) {
    this.app = app;
    this.nutrients = nutrients;
    this.recipeObj = {
      ingredients: [],
      instructions: []
    };
    this.setRoutes();
  }

  setRoutes() {

    // ########################################## |
    // #           INDEX.html ROUTES            # |
    // ########################################## v

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

        let recipe = recipes.find((recipe) => recipe.name.toLowerCase().includes(value));
        res.json(recipe);
      }
    );

    // ########################################## |
    // #          ADMIN.html ROUTES             # |
    // ########################################## v

    this.app.get('/admin', (req, res) => {
      res.sendFile(path.join(__dirname, '../www/admin.html'));
    })

    /* // post new recipe
    this.app.post('/recipes', (req, res) => {
      recipes = require(recipePath);
      recipes.push(req.body);
      fs.writeFile(recipePath, JSON.stringify(recipes, null, '  '), error => {
        console.log(error);
        res.json({ success: !error })
      });
    }); */


    this.app.post('/recipes', (req, res) => {
      recipes = require(recipePath);
      recipes.push(this.recipeObj);
      fs.writeFile(recipePath, JSON.stringify(recipes, null, '  '), error => {
        console.log(error);
        res.json({ success: !error })
      });
    });


    this.app.get('/clear-recipe-object', (req, res) => {

      this.recipeObj.category = '';
      this.recipeObj.portions = '';
      this.recipeObj.name = '';
      this.recipeObj.urlToImg = '';
      this.recipeObj.instructions.length = 0;
      this.recipeObj.ingredients.length = 0;

      res.json(this.recipeObj);
    })


    this.app.post('/add-category', (req, res) => {
      console.log(req.body);
      let newCategory = req.body.recipe_category;

      console.log('New category added: ', newCategory);
      this.recipeObj.category = newCategory;

      res.json(this.recipeObj.category);
    });


    this.app.post('/add-portions', (req, res) => {
      console.log(req.body);

      let newPortions = req.body.recipe_portions;

      console.log('New portions added: ', newPortions);
      this.recipeObj.portions = newPortions;

      res.json({ message: 'OK', recipeObj: this.recipeObj.portions });
    });


    this.app.post('/add-name', (req, res) => {
      console.log(req.body);
      let newName = req.body.recipe_name;

      console.log('New name added: ', newName);
      this.recipeObj.name = newName;

      res.json(this.recipeObj.name);
    });


    this.app.post('/add-instruction', (req, res) => {
      console.log(req.body);

      let newInstruction = req.body.recipe_instruction;

      console.log('New instruction added: ', newInstruction);
      this.recipeObj.instructions.push(newInstruction);

      res.json({ message: 'OK', recipeObj: this.recipeObj.instructions });
    });


    this.app.post('/add-image', (req, res) => {
      console.log(req.body);
      let newImage = req.body.recipe_image;

      console.log('New image added: ', newImage);
      this.recipeObj.urlToImg = newImage;

      res.json(this.recipeObj.urlToImg);
    });


    this.app.post('/add-ingredient', (req, res) => {
      console.log(req.body);

      let newIngredient = {
        name: req.body.ingredient_name,
        units: req.body.ingredient_units,
        measuringUnit: req.body.ingredient_measuring_unit,
        unitEquivalentInGrams: req.body.ingredient_grams
      };

      console.log('New ingredient added: ', JSON.stringify(newIngredient));
      this.recipeObj.ingredients.push(newIngredient);

      res.json({ message: 'OK', recipeObj: this.recipeObj.ingredients });
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