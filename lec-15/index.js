const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require('path');

app.set("view engin", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser);

const port = 3000;

app.get("/", function(req, res){
    res.send("Welcome again");
})

app.listen(port, ()=>{
    console.log(`Your app running on port: ${port}`);
})