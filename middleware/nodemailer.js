const nodemailer = require('nodemailer');
require("dotenv").config();
module.exports={
    mailTransporter :nodemailer.createTransport({
       service: "gmail",
       auth: {
         user: process.env.AUTH_USER,
         pass: process.env.AUTH_PASS  ,
       },
     })
     
}