require("dotenv").config();
const User = require("../../models/userModel");
const bcryptjs = require("bcryptjs");
const otp_find = require("../../middleware/nodemailer");
const otp = require("../../models/otp");
const session = require('express-session');
const { aggregate } = require("../../models/cartModel");
const mongoose = require('mongoose')
const securePassword = async (password) => {
  try {
    console.log("chage hash");
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

const userlogin = async(req, res) => {
  if(req.session.userlo){
    res.redirect('/')
  }else{
    res.render("user/login.ejs");
  }
  
};
const usersign =async (req, res) => {
  res.render("user/sign_up.ejs");
};

//insert data form user
const userInsert = async (req, res) => {
  try {
    let data = req.body;
    const user = await User.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (user) {
      res.render("user/sign_up.ejs", { error: "User Already Exist" });
    } else {
      const OTP =  Math.floor(1000 + Math.random() * 9000);
      let mailDetails = {
        from: process.env.AUTH_USER,
        to: data.email,
        subject: "WOODQ VERIFICATION",
        html: `<p>YOUR OTP FOR REGISTERING IN WOODQ IS <h1> ${OTP} <h1> </p>`,
      };
      otp_find.mailTransporter.sendMail(mailDetails, (err, Data) => {
        if (err) {
          console.log(err);
        } else {
          const otp_store =  new otp({
            otp: OTP,
          });
          console.log(OTP);
          otp_store.save();
          console.log(data);
          
          res.render("user/otp.ejs", { data });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//otp page
const user_otp = async (req, res) => {
  let data = req.body;
  console.log(data);
  const otps = await otp.findOne({ otp: data.otp });
  if (otps) {
    await otp.deleteOne({ otp: data.otp });
    console.log("1");

    const spassword = await securePassword(req.body.password);
    const user1 = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: spassword,
      //conformpassword:spassword
    });
    user1.save();
    console.log("2");

    res.render("user/login");
  } else {
    res.render("user/otp.ejs", { wrong: "Please Enter a Valid OTP", data });
  }
};

// user log in

const userverificate = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body.password);
    const userData = await User.findOne({ email: email });
   
    if (userData) {
      if (userData.status) {
        const match = await bcryptjs.compare(
          req.body.password,
          userData.password
        );
        if (match) {
          req.session.userlo = userData._id
          res.redirect('/')
         
        
        } else {
          res.render("user/login.ejs", { wrong: "Invalid Credentials" });
        }
      } else {
        res.render("user/login.ejs", { wrong: "Blocked Credentials" });
      }
    } else {
      res.render("user/login.ejs", { wrong: "user not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.render("user/login.ejs", { wrong: "user not foundmnnnmn" });
  }
};

//home page

const homeLo = async (req, res) => {
  const userData = await User.findOne();
  res.render("user/home.ejs",{userData});
};


const profile =async (req,res)=>{
  res.render('user/profile')
}




module.exports = {
  userlogin,
  usersign,
  userInsert,
  userverificate,
  homeLo,
  user_otp,
  profile,


};
