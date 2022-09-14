const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model"); // on importe le modèle de Recipe.model.js

const data = require("./data"); // on impporte la data de data.json

const MONGODB_URI = "mongodb://localhost:27017/recipe-app"; // variable qui indique le port du server

// Je me connecte à la database
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany(); // se connecter à la database induit directement l'effacement des données déjà présentes dans cette dernière
  })
  .then(() => {
    // je créer une dépendance "then" à mon action d'éffacement qui créer le plat 'tiramisu' (si effacement des données alors création de mon tiramisu)
    return Recipe.create({
      title: "Tiramisu",
      level: "Easy Peasy",
      ingredient: ["cheese", "eggs", "sugar"],
      cuisine: "international",
      dishType: "dessert",
      image: "none",
      duration: 15,
      creator: "Cécile",
      created: 2005,
      created: new Date(Date.now()),
    })
      .then(function (newRecipe) {
        // si la création de mon plat est ok alors je console log le nom du plat
        console.log("1 recipe created:", newRecipe.title);
      })
      .catch((err) => {
        // affichage erreur si le plat n'est pas créé
        console.log(err);
      });
  });

Recipe.insertMany(data) // j'insère tout les recipes de data.json en prenant comme modèle newRecipe
  .then(function (recipes) {
    console.log(`${recipes.length} recipes created`); // j'indique le nombre de plats de a base de données

    // recipes: [ {_id: , title: , ...}, {}, {}]
    recipes.forEach(function (el) {
      // formule forEach pour dire pour chaque éléments de la base...
      console.log(el.title); // j'affiche le titre de tout les éléments de la base de données 'Recipes'
    });
  });

Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }) // quand tu veux changer un élément, juste mettre la MAJ, inutile de rappeler l'ancienne donnée
  .then(function (oneUpdate) {
    console.log("Duration of Rigatonies changed with succes");
  })
  .catch(function (oneUpdateMiss) {
    console.log("Failed to change Rigatoni datas");
  });

Recipe.deleteOne({ title: "Carrot Cake" }) // quand tu veux delete toute la recette
  .then(function (oneDelete) {
    console.log("Carrot cake deleted with succes");
  })
  .catch(function (oneDeleteMiss) {
    console.log("Carrot cake not deleted");
  })

  .then(() => { // meetre la deconnection derrière un "then" permet de l'éxécuter en dernière
    mongoose.connection.close();
    console.log("Connection closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });