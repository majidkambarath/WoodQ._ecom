const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category:{
        type:String
    },
    image:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    }
})

const category = new  mongoose.model('category',categorySchema);
module.exports = category