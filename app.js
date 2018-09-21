const express = require('express');

const app = express();

app.use(express.static('www'));

let server = app.listen(3000, () => {
  console.log('Server is listening on port', server.address().port)
});

const fs = require('fs');


// Read the json livsmedelsdata into ldata
// (convert it from a JSON-string to JS data)
const Component = require('./classes/component.class.js');
let foodComponentData = require('./json/livsmedelsdata.json');
foodComponentData = foodComponentData.map(obj => new Component(obj));


// Create server routes 
let Routes = require('./classes/routes.class.js');
new Routes(app, foodComponentData);
