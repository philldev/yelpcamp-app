const mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    firstName : String,
    lastName : String,
    email : String,
    avatar : {
        type:String, default:"/images/avatar/avatar.svg"
    },
    isAdmin : {type: Boolean, default:false},
    password : String
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);