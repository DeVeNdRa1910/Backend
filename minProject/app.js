const express = require('express');
const userModel = require('./models/user');
const postModel = require('./models/post');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
})

app.post('/resister',async (req, res)=>{
    let {name, username, age, email, password} = req.body;

    let user = await userModel.findOne({email});

    if(user) return res.status(500).send("user already resistered")
    
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            userModel.create({
                username, 
                name, 
                email, 
                age, 
                password: hash,
            })

            let token = jwt.sign({email: email, userid: user._id}, "iseProtectKarnaHotaHaiButAbhiNahi")

            res.cookie("token", token);
            res.send("resistered");
        })
    })
})

app.listen(3000);