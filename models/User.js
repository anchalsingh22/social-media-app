const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    profilePic: {
        type: String,
        default: "https://via.placeholder.com/100"
    },

    followers: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model("User", UserSchema);