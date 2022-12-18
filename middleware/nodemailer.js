const nodemailer = require('nodemailer');
require("dotenv").config();
module.exports={
    mailTransporter :nodemailer.createTransport({
       service: "gmail",
       auth: {
         user: process.env.AUTH_USER,
         pass: process.env.AUTH_PASS  ,
       },
     }),

     OTP  : `${Math.floor(1000 + Math.random() * 9000)}` ,
     
}