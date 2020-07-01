const mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    avatar : {
        type:String, default:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    },
    isAdmin : {type: Boolean, default:false},
    password : String
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);