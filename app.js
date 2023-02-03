const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
const port = 9000

let items = [];

app.get('/', (req, res) => {

    let today = new Date();
    

    let options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
         };

    let day = today.toLocaleDateString("en-US", options);



        res.render("list", {kindOfDay: day, newItems: items});
   
});


app.post('/', (req, res) => {

    let addToList = "";
    let item = req.body.addToList; 

   items.push(item)

    res.render("list", {newItem: addToList});
    res.redirect('/');

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});