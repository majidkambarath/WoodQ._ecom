const mongoose = require('mongoose');
const bannerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    }
})

const banner = new mongoose.model("banner",bannerSchema);
module.exports = banner;