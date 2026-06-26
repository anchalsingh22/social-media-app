const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    profilePic: {
        type: String,
        default: "https://via.placeholder.com/100"
    },

    content: {
        type: String,
        required: true
    },

    likes: {
        type: Number,
        default: 0
    },

    comments: [
        {
            text: String
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Post", PostSchema);