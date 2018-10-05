const fs = require('fs');
const path = require('path');
const recipePath = path.join(__dirname, '../json/recipes.json');
let recipes = require(recipePath);

module.exports = class Routes {

  constructor(app, ingredientData) {
    this.app = app;
    this.ingredientData = ingredientData;
    this.recipeObj = {
      ingredients: [],
      instructions: [],
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

    this.app.get(
      '/recipes-by-tag/:category',
      async (req, res) => {
        let value = req.params.category.toLowerCase();

        let result = recipes.filter(
          recipe => recipe.category.toLowerCase().includes(value)
        );
        res.json(result);
      }
    );

  /*   this.app.get(
      '/get-all-recipes/',
      async (req, res) => {
        res.json(recipePath);
      }
    ); */

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

        let result = this.ingredientData.filter(
          ingredient => ingredient.Namn.toLowerCase().indexOf(start) == 0
        ).map(
          ingredient => ingredient.Namn
        );
        res.json(result);
      }
    );

    /* // find ingredient by exact name and return it
    this.app.get(
      '/ingredient-by-name/:name',
      async (req, res) => {
        let value = req.params.name.toLowerCase();
        if (value.length === 0) {
          res.json({ error: 'No ingredient name' });
          return;
        }

        let result = this.ingredientData.find((ingredient) => ingredient.Namn.toLowerCase().includes(value));
        res.json(result);
      }
    ); */


    this.app.post('/recipes', (req, res) => {

      let nutrition = {
        "Energi (kcal)": 0,
        "Protein": 0,
        "Kolhydrater": 0,
        "Socker totalt": 0,
        "Summa mättade fettsyror": 0,
        "Summa enkelomättade fettsyror": 0,
        "Summa fleromättade fettsyror": 0,
        "Salt": 0,
      };

      for (let key in this.recipeObj.ingredients) {

        let ingredientName = this.recipeObj.ingredients[key].name.toLowerCase();
        let ingredientUnits = this.recipeObj.ingredients[key].units;
        let ingredientUnitInGrams = this.recipeObj.ingredients[key].unitEquivalentInGrams;

        let ingredientObj = this.ingredientData.find(
          (ingredient) => ingredient.Namn.toLowerCase().includes(ingredientName));
        let ingredientData = ingredientObj.Naringsvarden.Naringsvarde;


        for (let nutrient in ingredientData) {
          let nutrientName = ingredientData[nutrient].Namn;
          if (nutrientName in nutrition) {

            let value = ingredientData[nutrient].Varde;
            let valueWithDot = value.replace(",", ".");
            let parsedValue = parseFloat(valueWithDot);

            let result = parsedValue * ingredientUnits * ingredientUnitInGrams / 100;
            nutrition[nutrientName] += result;
          }
        }
      }

      this.recipeObj.nutritions = nutrition;
      this.recipeObj.portions = 2;

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
      let newCategory = req.body.recipe_category;
      this.recipeObj.category = newCategory;

      res.json(this.recipeObj.category);
    });


    /* this.app.post('/add-portions', (req, res) => {
      let newPortions = req.body.recipe_portions;
      this.recipeObj.portions = newPortions;

      res.json({ message: 'OK', recipeObj: this.recipeObj.portions });
    }); */


    this.app.post('/add-name', (req, res) => {
      let newName = req.body.recipe_name;
      this.recipeObj.name = newName;

      res.json(this.recipeObj.name);
    });


    this.app.post('/add-instruction', (req, res) => {
      let newInstruction = req.body.recipe_instruction;
      this.recipeObj.instructions.push(newInstruction);

      res.json({ message: 'OK', recipeObj: this.recipeObj.instructions });
    });


    this.app.post('/add-image', (req, res) => {
      let newImage = req.body.recipe_image;
      this.recipeObj.urlToImg = newImage;

      res.json(this.recipeObj.urlToImg);
    });


    this.app.post('/add-ingredient', (req, res) => {
      let newIngredient = {
        name: req.body.ingredient_name,
        units: req.body.ingredient_units,
        measuringUnit: req.body.ingredient_measuring_unit,
        unitEquivalentInGrams: req.body.ingredient_grams
      };

      this.recipeObj.ingredients.push(newIngredient);

      res.json({ message: 'OK', recipeObj: this.recipeObj.ingredients });
    });
  }
}