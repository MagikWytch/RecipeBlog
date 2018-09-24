const RecipeIngredient = require('./recipeIngredient.class');

module.exports = class Recipe {

    constructor(props) {
    
       
        Object.assign(this, props);

    }

    static async readFromFile(value){
        
        value = value.toLowerCase().replace(/![a-z]/g,'');


        // if value exists within the recipe names in the .json file, 
        // gather those recipes with a partial match in
        // a variable and send it back



        let filePath = Recipe.createFilePath(recipeName);
        let contents = await fs.readFile(filePath, 'utf-8');
        // if the file doesn't exist we get an error
        if(contents instanceof Error){
          return {error: contents};
        }
        // otherwise we get JSON data that
        // we'll convert to a Recipe instance
        let data = JSON.parse(contents);
        return new Recipe(data);
      }

}

