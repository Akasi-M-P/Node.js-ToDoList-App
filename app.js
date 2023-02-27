
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
// const date = require("./myModule");

// create an instance of an express app
const app = express()


// use body-parser to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files (e.g. css, images) from the "public" folder
app.use(express.static("public"));


// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/todolistDB";

// Wait for database to connect, logging an error if there is a problem 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Define schema
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    name: String,
});

// Compile model from schema
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome"
});

const item2 = new Item({
    name: "Hit + for new item"
});

const item3 = new Item({
    name: "Delete"
});


const defaultItems = [item1, item2, item3];






// set the view engine to ejs
app.set('view engine', 'ejs');

// set the port for the app to listen on
const port = 9000

// // define an array for the items to be added to the to-do list
// const items = [];

// // define an array for the items to be added to the work list
// const workItems = [];


// when a GET request is made to the root path ('/'), render the "list" template
app.get('/', (req, res) => {

//    let day = date.getDate();

    // render the "list" template and pass the "day" and "items" arrays as variables
    res.render("list", {listTitle: "Today", newItems: items});
   
});


// when a POST request is made to the root path ('/'), add an item to the to-do list or work list
app.post('/', (req, res) => {

   // get the item from the request body
    let item = req.body.addToList; 

    // check the value of the "list" property in the request body
    // if it's "Work", add the item to the work list and redirect to the "/work" route
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work")

    // if it's not "Work", add the item to the to-do list and redirect to the root path
    } else {
        items.push(item)
        res.redirect('/');
       
    }

  
});

// when a GET request is made to the "/work" route, render the "list" template for the work list
app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", newItems:workItems});
})

// when a POST request is made to the "/work" route, add an item to the work list
app.post("/work", (req, res) => {
    let item = req.body.newItems;
    workItems.push(item);
    res.redirect('/work');
})

// when a GET request is made to the "/about" route, render the "about" template
app.get('/about' , (req, res) => {
    res.render('about');
})

// start the app and log a message to the console when it's ready






app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});