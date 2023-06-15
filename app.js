//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);

// Define the database URL to connect to.
const mongoDB = "mongodb+srv://myfirstclusterusername:1FxowsCRyipx0mcv@myfirstcluster.1pfd8uq.mongodb.net/todolistDB";

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

// const item1 = new Item({
//     name: "Welcome"
// });

// const item2 = new Item({
//     name: "Hit + for new item"
// });

// const item3 = new Item({
//     name: "Delete"
// });

const defaultItems = [];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model('List', listSchema);

app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems){
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length === 0 && defaultItems.length === 0) {
        res.render("list", {listTitle: "Today", newListItems: []});
      } else if (foundItems.length === 0) {
        Item.insertMany(defaultItems, function(err){
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully saved default items to DB.");
          }
          res.redirect("/");
        });
      } else {
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
    }
  });
});



app.get("/:customListName", function(req, res) {
 const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList) {
    if (!err) {
      if(!foundList){

        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        list.save();
        res.redirect("/"  + customListName)
      } else {
       
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  })
  
 

 
});



app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName 
  });
    
    if (listName === "Today"){
      item.save();
      res.redirect("/");
    } else {
      List.findOne({name: listName}, function(err, foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      })
    }
   
  
});


app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

   if (listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, function (err){
      if (!err) {
        console.log("Successfully deleted");
  
        res.redirect("/");
   }
  });
} else {
  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
    if (!err){
      res.redirect("/" + listName);
    }
  });
}
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
