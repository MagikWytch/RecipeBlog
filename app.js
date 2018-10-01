const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('www'));
app.use(express.json({extended: true}));

let server = app.listen(3000, () => {
  console.log('Server is listening on port', server.address().port)
});

const Ingredients = require('./classes/ingredients.class.js');

let nutrients = require('./json/livsmedelsdata.json');
nutrients = nutrients.map(obj => new Ingredients(obj));
// foodData[10].Naringsvarden.Naringsvarde.forEach(item => {
//   console.log(item)
// });

// Create server routes 
let Routes = require('./classes/routes.class.js');
new Routes(app, nutrients);