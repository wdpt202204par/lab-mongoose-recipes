const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// async

async function main() {
    await mongoose.connect(MONGODB_URI)
    console.log('connected!')

    await Recipe.deleteMany()
    console.log('clean')

    const p1 = Recipe.create({
        title: "Pizza Regina",
        level: "Amateur Chef",
        ingredients: ["pizza dough", "tomato", "mozzarella", "ham", "olive", "mushrooms"],
        cuisine: "Italian",
        dishType: "main_course",
        image: "https://img.cuisine-etudiant.fr/image/recette/800500/30a08382dd90bcc6e242e84055b2578cf12df04b-veritable-pizza-regina-buonissimo.jpg",
        duration: 15,
        creator: "Peppe",
        created: 1780
    })
        .catch((err) => {
            console.log("oops pizza not created")
            throw err
        })

    const p2 = Recipe.create(data)
        .catch((err) => {
            console.log("oops, data not created")
            throw err
        })
    await Promise.all([p1, p2])
    console.log("pizza created")
    console.log("data created")

    await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }).catch(err=>{
        console.log('rigatoni uptade error',err)
        throw err
    })
    console.log("data updated")

    await Recipe.deleteOne({ title: "Carrot Cake" }).catch(err => {
        console.log('oops deleteone', err)

        throw err 
    }) 
    console.log("carrot cake deleted")
}

main()
    .catch(err => {
        console.log('oopsy doopsy', error)
    })
    .finally(() => {
        mongoose.connection.close()
        console.log('connection closed')
    })


// Connection to the database "recipe-app"
// mongoose
//     .connect(MONGODB_URI)
//     .then(x => {
//         console.log(`connected to the database: "${x.connection.name}"`);
//         //Before adding any recipes to the database, let's remove all existing ones
//         console.log('full clear')
//         return Recipe.deleteMany()
//     })
//     .then(() => {
//         const p1 = Recipe.create({
//             title: "Pizza Regina",
//             level: "Amateur Chef",
//             ingredients: ["pizza dough", "tomato", "mozzarella", "ham", "olive", "mushrooms"],
//             cuisine: "Italian",
//             dishType: "main_course",
//             image: "https://img.cuisine-etudiant.fr/image/recette/800500/30a08382dd90bcc6e242e84055b2578cf12df04b-veritable-pizza-regina-buonissimo.jpg",
//             duration: 15,
//             creator: "Peppe",
//             created: 1780
//         })
//             .catch((err) => {
//                 console.log("oops pizza not created")
//                 throw err // retrhow
//             })

//         const p2 = Recipe.create(data)
//             .catch((err) => {
//                 console.log("oops, data not created")
//                 throw err
//             })

//         return Promise.all([p1, p2])
//             .then(() => {
//                 console.log("pizza created")
//                 console.log("data created")
//             })
//             .catch(err => {
//                 console.log('either one or the other ')
//                 throw err
//             })
//     })
//     .then(() => {
//         return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
//             .then(() => { console.log("data updated") })
//             .catch(() => { console.log("oops, data not updated") })
//     })
//     .then(() => {
//         return Recipe.deleteOne({ title: "Carrot Cake" })
//             .then(() => { console.log("carrot cake deleted") })
//             .catch(() => { console.log("oops, carrot cake not deleted") })
//     })
//     .then(() => {
//         mongoose.connection.close()
//         console.log("connection closed")
//     })
//     .catch(error => {
//         console.log('oopsy doopsy', error)
//     })