const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
const port = 9000

let items = [];
let workItems = [];




app.get('/', (req, res) => {

    let today = new Date();
    

    let options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
         };

    let day = today.toLocaleDateString("en-US", options);



        res.render("list", {listTitle: day, newItems: items});
   
});




app.post('/', (req, res) => {

  
    let item = req.body.addToList; 

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work")

    } else {
        items.push(item)
        res.redirect('/');
       
    }

  
});

app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", newItems:workItems});
})


app.post("/work", (req, res) => {
    let item = req.body.newItems;
    workItems.push(item);
    res.redirect('/work');
})


app.get('/about' , (req, res) => {
    res.render('about');
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});