const express = require("express")

const app = express();
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("index")
    // here we render the page present inside views named as index.ejs
})

// now this dynamic devendra ki jagah kuchh bhi likh sakte ho.
// app.get("/auther/:tersayytu", function(req, res){
//     res.send("auther is devendra")
// })
app.get("/auther/:autherName", function(req, res){
    const authname = req.params.autherName
    res.send(`Respected Auther is ${authname.toUpperCase()}`)
})
app.get("/auther/:autherName/:autherAge", function(req, res){
    const authname = req.params.autherName
    const authage = req.params.autherAge
    res.send(`Respected Auther is ${authname.toUpperCase()} and age of auther is ${authage}`)
})

app.listen(3000, function(){
    console.log("Its Running");
})