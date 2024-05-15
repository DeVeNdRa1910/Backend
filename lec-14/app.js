const express = require('express')
const cookieParser = require('cookie-parser')
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")

const app = express()

const port = 3000

app.use(cookieParser())

/* 
app.get('/', function(req, res){
    res.cookie("name", "Jahnvi Panday My Love");
    res.send("Done")
    //Here we set cookie on home route ab ham ab is port ke kisi bhi browser me jaye to to ye cookie hamare sath rahegi
})

app.get('/read', function(req, res){
    console.log(req.cookies);
    res.send("<h1>Here we set cookie on home route ab ham ab is port ke kisi bhi browser me jaye to to ye cookie hamare sath rahegi</h1>")
})
*/



/* 
let my_password = "devendra@2000";
let encryptedPassword = "";
// you can capy this code from npm_bcrypt
app.get('/' , function(req, res){
    // gensalt is rendom String of 10(given by us) chars
    bcrypt.genSalt(10, function(err, salt){
        console.log(salt);
        bcrypt.hash("devendra@2000", salt, function(err, hash){
            encryptedPassword = hash
            console.log("Your Password after encryption: ", encryptedPassword);
        })   
    })
}) 


let encryptedPassword = "$2b$10$U.YrbPc1/ZtTGSNVp19IaOJJOiaNcnRamir4oKhxHS9ad.uNjO9Ti"; // you can copy from terminal

app.get('/', function(req, res){
    bcrypt.compare(my_password, encryptedPassword, function(err, result){
        console.log(result); // id match it will return true; else  return false;
    })
})
*/


//jwt
app.get('/',  function(req, res){
    // we storing email most of the time bcz every email is unique
    let token = jwt.sign({email: "devendra@gmail.com"}, "secret")
    res.cookie("token", token)
    res.send("<h1>cookie stored</h1>")
    console.log(token);
})
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldmVuZHJhQGdtYWlsLmNvbSIsImlhdCI6MTcxNTc2NTg5OH0.hUmpHH67IzXUwY8qOTFWvPMI2eDXgcfj3vX-3GN_kJo
// we are sending this string to browser as cookie

// main data dono dots(.) ke mid bali string me hota hai

app.get('/read', function(req, res){
    console.log(req.cookies.token);
    let data = jwt.verify(req.cookies.token, "secret");
    res.send("DONE")
})



app.listen(port, () => {
    console.log(`Your app running on port ${port}`);
})
