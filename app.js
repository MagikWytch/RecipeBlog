const express = require('express');

const app = express();

app.use(express.static('www'));

let server = app.listen(3000, () => {
  console.log('Server is listening on port', server.address().port)
});

const fs = require('fs');

const Ingredients = require('./classes/ingredients.class.js');

let foodData = require('./json/livsmedelsdata.json');
foodData = foodData.map(obj => new Ingredients(obj));
// foodData[10].Naringsvarden.Naringsvarde.forEach(item => {
//   console.log(item)
// });

// Create server routes 
let Routes = require('./classes/routes.class.js');
new Routes(app, foodData);
