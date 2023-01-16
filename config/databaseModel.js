const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://abdulmajid:kTfC3yvYZsygolPD@cluster0.gxblqac.mongodb.net/test?retryWrites=true&w=majority").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("no connected");
})