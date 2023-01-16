const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://abdulmajid:kTfC3yvYZsygolPD@cluster0.gxblqac.mongodb.net/test").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("no connected");
})