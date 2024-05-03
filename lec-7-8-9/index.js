const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded(({extended: true})))
app.use(express.static(path.join(__dirname, "public")))
// app.use(express.static(__dirname+'public'))

app.get('/', function(req, res){
    // res.send("Welcome");
    fs.readdir(`./files`, function(err, files){
        console.log(files);
        res.render("index", {files: files});
    })
})

app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, 'utf-8' , function(err, fileData){
        console.log(fileData);
        res.render('show', {fileName: req.params.filename , fileData: fileData})
    })
})

app.get('/edit/:filename', function(req, res){
    res.render("edit", {fileName: req.params.filename})
})

app.post('/create', function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join("")}.text` , req.body.details, function(err){
        res.redirect('/')
    })
})

app.listen(3000);