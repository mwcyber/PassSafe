const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    authToken: {
        type: String,
        required: true,
    },
    vault: {
        type: String,
        required: true,
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;