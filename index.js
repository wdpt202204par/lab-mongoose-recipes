const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({
      title: "Pizza Regina",
      level:
        "Amateur Chef",
      ingredients: ["pizza dough", "tomato", "mozzarella", "ham", "olive", "mushrooms"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://img.cuisine-etudiant.fr/image/recette/800500/30a08382dd90bcc6e242e84055b2578cf12df04b-veritable-pizza-regina-buonissimo.jpg",
      duration: 15,
      creator: "Peppe",
      created: 1780
    })
      .then(function () {
        console.log("pizza created")
      })
      .catch(function () {
        console.log("oops pizza error")
      })
    Recipe.create(data)
      .then(function () {
        console.log("data created")
        Recipe.findOneAndUpdate({
          title: "Rigatoni alla Genovese"
        }, { duration: 100 })
          .then(function () {
            console.log("data updated")
            Recipe.deleteOne({
              title: "Carrot Cake"
            })
              .then(function () {
                console.log("Carrot deleted")
                mongoose.connection.close()
                console.log("connection close")
              })
              .catch(function () {
                console.log("Carrot not deleted")
              })
          })
          .catch(function () {
            console.log("oops data not updated")
          })
      })
      .catch(function () {
        console.log("oops data error")
      })
  }
  )
  .catch(error => {
    console.error('Error connecting to the database', error);
  })




