const express = require('express')
const app = express()

app.use(function(req, res, next){
    console.log("Middleware chala");
    next()
})
//is server par koi bhi route se pehle app.use() chalega  (ye middleware hai) next() ke through ham request ko age forword karte hai
app.use(function(req, res, next){
    console.log("Middleware chala ek oor baar");
    next()
})



// now we can set routes
// app.get(route, requestHandler) -> route and requestHandler both are middleware
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/youtube', function(req, res){
    res.send("<h1>DV MUSIC</h1>")
})

app.get("/about", function(req, res){
    // res.send("This About page")
    return next(new Error("Somthing went wrong"))
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Sopmthing broke!")
})

app.listen(3000)