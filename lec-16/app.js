const express = require("express")
const userModel = require("./models/User");
const postModel = require("./models/Post");

const app = express();

app.get('/', function(req, res){
    res.send("HEllo ji")
})

app.get('/create',async function(req, res){
    let user = await userModel.create({
        username: "devendra",
        age: 25,
        email: "devendra@gmail.com"
    })
    res.send(user)
})

app.get('/post/create', async function(Req, res){
    let post = await postModel.create({
        postdata: "hello saare log alert ho jao abbu aa rahe h backend fodne",
        user: "6644e46e4a4f4746c0ab67c2",
    })

    let user = await userModel.findOne({_id:"6644e46e4a4f4746c0ab67c2"})
    user.posts.push(post._id)
    await user.save()


    res.send({user, post})
})

app.listen(3000)