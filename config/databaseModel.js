const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/WoodQ").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("no connected");
})