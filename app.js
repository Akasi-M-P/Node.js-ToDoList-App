
const express = require("express")
const bodyParser = require("body-parser")

// create an instance of an express app
const app = express()

// use body-parser to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files (e.g. css, images) from the "public" folder
app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the port for the app to listen on
const port = 9000

// define an array for the items to be added to the to-do list
let items = [];

// define an array for the items to be added to the work list
let workItems = [];


// when a GET request is made to the root path ('/'), render the "list" template
app.get('/', (req, res) => {

    // create a new Date object
    let today = new Date();
    
    // an object with options for formatting the date string
    let options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
    };

    // format the date using the options object
    let day = today.toLocaleDateString("en-US", options);

    // render the "list" template and pass the "day" and "items" arrays as variables
    res.render("list", {listTitle: day, newItems: items});
   
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