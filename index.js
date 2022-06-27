const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Tiramisu',
      level: 'Easy Peasy',
      ingredient: ['cheese',
                   'eggs',
                   'sugar'],
      cuisine: 'international',
      dishType: 'dessert',
      image: 'none',
      duration: 15,
      creator: 'Cécile',
      created: 2005,
    })
      .then(function (newRecipe) {
        console.log("1 recipe created:", newRecipe.title);
      })
      .catch((err) => {
        console.log(err);
      });

    Recipe.insertMany(data) // j'insère tout les recipes de data.json en prenant comme modèle newRecipe
      .then(function (recipes) {
        console.log(`${recipes.length} recipes ont ete crees`);

        // itérartion 3 :

        // recipes: [ {_id: , title: , ...}, {}, {}]
        recipes.forEach(function (el) {
          console.log(el.title)
        })

        // itération 4 :

        Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration:100})
        .then(function(oneUpdate) {
          console.log('data changed with succes')})
        .catch(function(oneUpdateMiss) {
          console.log('not changed')});
      })

      .catch((err) => console.log("oops", err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
