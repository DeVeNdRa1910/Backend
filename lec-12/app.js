const express = require("express");
const path = require('path')
const app = express();
const userModel = require('./Models/user')

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))


app.get('/', function(req, res){
    res.render("index")
})

app.get('/read',async function(req, res){
    let allUsers = await userModel.find()
    res.render("read", {users: allUsers})
})

app.post('/create',async function(req, res){
    
    let {name, email, image} = req.body;

    // name: name -> name
    let createdUser = await userModel.create({
        name,
        email,
        image
    })

    res.redirect('/read')
})

app.get('/delete/:id',async function(req, res){
    let user = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read")
})


app.listen(3000)