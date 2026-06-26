const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const User = require("./models/User");
const Post = require("./models/Post");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// ======================
// USER ROUTES
// ======================

// Create User Profile

app.post("/register", async (req, res) => {

    try {

        const user = new User(req.body);

        await user.save();

        res.json(user);

    } catch (err) {

        res.status(500).json(err);

    }

});


// Get All Users

app.get("/users", async (req, res) => {

    const users = await User.find();

    res.json(users);

});


// Follow User

app.put("/follow/:id", async (req, res) => {

    const user = await User.findById(req.params.id);

    user.followers += 1;

    await user.save();

    res.json(user);

});



// ======================
// POST ROUTES
// ======================


// Create Post

app.post("/post", async (req, res) => {

    try {

        const post = new Post(req.body);

        await post.save();

        res.json(post);

    } catch (err) {

        res.status(500).json(err);

    }

});


// Get Posts

app.get("/posts", async (req, res) => {

    const posts = await Post.find()
    .sort({ createdAt: -1 });

    res.json(posts);

});


// Like Post

app.put("/like/:id", async (req, res) => {

    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    res.json(post);

});


// Add Comment

app.put("/comment/:id", async (req, res) => {

    const post = await Post.findById(req.params.id);

    post.comments.push({
        text: req.body.text
    });

    await post.save();

    res.json(post);

});


// Home Route

app.get("/", (req, res) => {

    res.send("Mini Social Media App Running");

});


app.listen(process.env.PORT || 5000, () => {

    console.log("Server Running On Port 5000");

});