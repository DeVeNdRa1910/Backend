const express = require('express');
const userModel = require('./models/user');
const postModel = require('./models/posts');
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

app.get('/login', (req, res) => {
    res.render("login");
})

app.post('/register', async (req, res) => {
    let { name, username, age, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) return res.status(500).send("User already registered");

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send("Error while hashing password");

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.status(500).send("Error while hashing password");

            try {
                let newUser = await userModel.create({
                    username,
                    name,
                    email,
                    age,
                    password: hash,
                });

                let token = jwt.sign({ email: email, userid: newUser._id }, "iseProtectKarnaHotaHaiButAbhiNahi");
                res.cookie("token", token);
                res.send("Registered");
            } catch (error) {
                res.status(500).send("Error while creating user");
            }
        });
    });
})

app.get('/logout', (req, res)=>{
    res.cookie("token", "")
    res.redirect('login')
})

app.post('/login',async (req, res)=>{
    let {email, password} = req.body;

    let user = await userModel.findOne({email});

    if(!user) return res.status(500).send("Something went wrong")
    
    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
            let token = jwt.sign({ email: email, userid: user._id }, "iseProtectKarnaHotaHaiButAbhiNahi");
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        }
        else res.redirect('/login')
    })
})

function isLoggedIn(req, res, next){
    if(req.cookies.token === '') return res.redirect('/login');
    else{
        let data = jwt.verify(req.cookies.token, "iseProtectKarnaHotaHaiButAbhiNahi")
        req.user = data;
        next();
    }
}

//isLoggedIn is middleware for protected route like we dont want user can watch there profile before login so profile is protected rout

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("posts")
    res.render('profile', {user});
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user")
    
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
    await post.save()
    res.redirect('/profile')

})

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user")

    res.render("edit", {post})

})

app.post('/update/:id',async (req, res)=>{
    let post = await postModel.findOneAndUpdate({_id: req.params.id},{content: req.body.updatedContent})
    res.redirect("/profile")
})

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    let {content} = req.body;

    let post = await postModel.create({
        user: user._id,
        content: content
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
})



app.listen(3000);