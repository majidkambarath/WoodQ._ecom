const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("no connected");
})