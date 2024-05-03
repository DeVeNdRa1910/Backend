const express = require('express')
const app = express()

// now we can set routes
// app.get(route, requestHandler) -> route and requestHandler both are middleware
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/youtube', function(req, res){
    res.send("<h1>DV MUSIC</h1>")
})

app.listen(3000)