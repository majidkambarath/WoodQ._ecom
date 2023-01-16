const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/woodQ").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("no connected");
})