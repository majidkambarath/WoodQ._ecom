const mongoose = require('mongoose');
const bannerSchema = new mongoose.Schema({
    image:{
        type:Array,
       
    }
})

const banner = new mongoose.model("banner",bannerSchema);
module.exports = banner;