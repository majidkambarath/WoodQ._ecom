const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://abdulmajid:abdulmajid@cluster0.mj7qzoy.mongodb.net/woodQ?retryWrites=true&w=majority").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("no connected");
})