const mongoose = require('mongoose');
//schema structure of doucumnts users
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true
    }

    
})
//now we need to create a coollection
const User = new mongoose.model("register",userSchema);
module.exports = User;