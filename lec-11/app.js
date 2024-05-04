const express = require('express')
const userModel = require('./user.model')

const app = express();

app.get('/', function(req, res){
    res.send("Chal raha hai")
})

app.get('/create',async function(req, res){
    let createdUser = await userModel.create({
        name: "Devendra",
        email: "devendra@gmail.com",
        username: "devendra2000"
    })

    res.send(createdUser);

})

app.get('/update',async function(req, res){
    let updatedUser = await userModel.findOneAndUpdate(
                                {username: "devendra2000"}, 
                                {name: "Devendra Kumar Vishwakarma"}, 
                                {new: true}
                            )
    res.send(updatedUser);

})

app.get('/read',async function(req, res){
    // find means read
    let users = await userModel.find()
    // find will give all usere
    res.send(users);
})

app.get('/readOne',async function(req, res){
    // find means read
    let user = await userModel.find({username: "devendra2000"})
    // ye entry ke hisaab se data deta hai unique prop. denege to single user return karega yadi name denge to jin jin ka naam same hoga un sabhi ko return karega find()
    // find hamesa ek array return karta hai yadi user nahi hai to empty array return karta hai lekin yadi ham findOne() ka use karte hai to user na milne pr null return karta hai.
    res.send(user);
})

app.get("/delete", async function(req, res){
    let deletedUser = await userModel.findOneAndDelete({username: "devendra2000"});
    res.send(deletedUser)
})

app.listen(3000)