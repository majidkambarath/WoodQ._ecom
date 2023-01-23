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
        unique:true
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
    },
    address:[{
        FirstName : String,
        LastName : String,
        Address : String,
        State: String,
        Email : String,
        phone : Number,
        postCode :Number,
        primary:Boolean

    }],
    wallet:{
       totalAmount:Number,
       Transitions:[{
         amonut : Number,
         Date:{
            type:String,
            default:new Date(Date.now() + 5*24*60*60*1000).toISOString().slice(0,10)
         },
         status:String
       }]
    }
    

    
})
//now we need to create a coollection
const User = new mongoose.model("register",userSchema);
module.exports = User;