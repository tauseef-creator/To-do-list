const express = require('express')
const bodyParser= require("body-parser")
const date = require(__dirname + "/date.js")
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
var items = ["Eat","Sleep","Study"];
var workItems = [];
app.set('view engine', 'ejs');
app.use(express.static("public"))

app.get('/', (req, res) => {

  var day = date.getDate();
  res.render('list', {itemTitle: day, newListItems: items});
});

app.post("/", (req, res) => {
  
  item = req.body.newItem;
  
    if(req.body.list === "Work") {
      console.log(req.body) 
      workItems.push(item)
      res.redirect("/work")  
    } else {
      items.push(item);
      res.redirect("/");
    }
})

app.get("/work", (req, res) =>{
    res.render('list', {itemTitle: "Work List", newListItems: workItems})
})

app.get("/about", (req, res) => {
   res.render('about')
})

app.listen(process.env.PORT || "3000", () => {
    console.log('server started on 3000')
});