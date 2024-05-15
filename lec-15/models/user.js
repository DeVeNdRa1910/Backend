const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/authTestApp')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number
})

// export const User = mongoose.model("user", userSchema)
// OR
module.exports = mongoose.model("user", userSchema);