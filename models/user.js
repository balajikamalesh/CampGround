var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
                    username: String,
                    password: String,
                    avatar: String,
                    firstname: String,
                    lastname: String,
                    email: String,
                    isAdmin: {type: Boolean,default: false}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);