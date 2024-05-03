const express = require("express")

const app = express()

// hara data jo frontend par saved hai vo encode (encrypt) hokar server par jata hai. jise blob bolte hai
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.get("/", function(req, res){
    res.send("Hello Backend")
})

app.get("/about", function(req, res){
    res.send("<h1>This is About page</h1>")
})

app.get("/profile", function(req, res, next){
    return next(new Error("Not Implimented"))
})

app.use((err, req, res, next)=>{
    console.error(err.message)
    res.status(500).send("Something Broke!!")
})

app.listen(4000)