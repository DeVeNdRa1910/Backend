const  mongoose =  require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`)

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String
},{timestamps:true});

module.exports = mongoose.model("User", userSchema)