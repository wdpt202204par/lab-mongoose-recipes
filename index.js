const mongoose = require("mongoose");


const Recipe = require("./models/Recipe.model"); // on importe le modèle de Recipe.model.js

const data = require("./data"); // on impporte la data de data.json

const MONGODB_URI = "mongodb://localhost:27017/recipe-app"; // variable qui indique le port du server

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create({
      title: 'Tiramisu',
      level: 'Easy Peasy',
      ingredient: ['cheese', 'eggs', 'sugar'],
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
    console.log(`${recipes.length} recipes ont ete créés`); // j'indique le nombre de plats de a base de données

    // recipes: [ {_id: , title: , ...}, {}, {}]
    recipes.forEach(function (el) { // formule forEach pour dire pour chaque éléments de la base
      console.log(el.title) // j'affiche le titre de tout les éléments de la base de données
    })

    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration:100}) // quand tu veux changer un élément, juste mettre la MAJ, inutile de rappeler l'ancienne donnée
      .then(function(oneUpdate) {
      console.log('data changed with succes')})
      .catch(function(oneUpdateMiss) {
      console.log('not changed')
    });


    Recipe.deleteOne({title: "Carrot Cake"}) // quand tu veux delete toute la recette
      .then(function(oneDelete) {
      console.log('data deleted with succes')})
      .catch(function(oneDeleteMiss) {
      console.log('not deleted')});

    })
      .catch((err) => console.log("oops", err));
  })

    .catch((error) => {
    console.error("Error connecting to the database", error);
  })

/*   .then(() => {
    mongoose.connection.close();
    console.log("Connection closed");
  }) */

  .catch((error) => {
  console.error("Error connecting to the database", error);
})