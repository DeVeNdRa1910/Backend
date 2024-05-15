const express = require("express");
const userModel = require('./models/user')
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const path = require('path');
const jwt = require('jsonwebtoken')

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get("/", function(req, res){
    res.render("index");
})

app.post("/create", (req, res) => {
    let {username, password, email, age} = req.body;
    bcrypt.genSalt(10, (err, salt)=>{
        console.log(salt);
        bcrypt.hash(password, salt, async(err, hash)=>{
            console.log(hash);
            let createdUser = await userModel.create({
                username,
                email,
                age,
                password: hash,
            })

            let token = jwt.sign({email}, "hehehuhu");

            res.cookie("token", token);

            res.send(createdUser)
        })
    })
})

app.get('/login', function(req, res){
    res.render('login')
})

app.post('/login',async function(req, res){
    let user = await userModel.findOne({email: req.body.email})
    if(!user){
        return res.send("Something is wrong");
    }
    bcrypt.compare(req.body.password, user.password, function(err, result){
        console.log(result);
        res.send("Yes you can Login");
    })
})

app.get("/logout", function(req, res){
    res.cookie("token", "")
    res.redirect('/')
})

app.listen(3000 , () =>{
    console.log("Your app running on port: 3000");
})