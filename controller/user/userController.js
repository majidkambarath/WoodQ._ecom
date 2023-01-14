require("dotenv").config();
const User = require("../../models/userModel");
const bcryptjs = require("bcryptjs");
const otp_find = require("../../middleware/nodemailer");
const otp = require("../../models/otp");
const session = require('express-session');
const { aggregate } = require("../../models/cartModel");
const mongoose = require('mongoose')
const banner = require('../../models/banner')
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
 try {
  res.redirect('/')
 } catch (error) {
  console.log(error.message);
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
    

    const spassword = await securePassword(req.body.password);
    const user1 = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: spassword,
      //conformpassword:spassword
    });
    user1.save();
   

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
  try {
    // let banner_view = await banner.find()
    // let image = banner_view[0].image
    const userData = await User.findOne();
  res.render("user/home.ejs",{userData});
    
  } catch (error) {
    console.log(error.message);
  }
  
};


const profile =async (req,res)=>{
  res.render('user/profile')
}

//forgot password 
const forgPass = async(req,res)=>{
  res.render('user/forgPass')
}
//rest OTP 
const forgOTP = async(req,res)=>{
  if(req.session.restuser && req.session.restOTP){
    res.render('user/forgOTP')
  }else{
    res.redirect('/userSign_up')
  }
  
}
 
const passChange = async(req,res)=>{
  try {
    let email = req.body.email;
   const checking = await User.findOne({email:email})
   if(checking){
    const OTP =  Math.floor(1000 + Math.random() * 9000);
    req.session.restuser = email
    
    let mailDetails = {
      from: process.env.AUTH_USER,
      to: email,
      subject: "WOODQ VERIFICATION",
      html: `<p>YOUR OTP FOR REGISTERING IN WOODQ IS <h1> ${OTP} <h1> </p>`,
    };
    otp_find.mailTransporter.sendMail(mailDetails, (err, Data) => {
      
      if (err) {
        console.log(err);
      } else {
        req.session.restOTP = true
        const otp_store =  new otp({
          otp: OTP,
        });
        console.log(OTP);
        otp_store.save();

        res.redirect('/forgOTP')
      }
    });

   }else{
    res.render('user/forgPass',{wrong:'User Not Found'})
   }
   

  } catch (error) {
    console.log(error.message);
  }
}
const passwordChange = async(req,res)=>{
  if(req.session.resetOTP && req.session.restuser){
    res.render('user/changePass')
  }else{
    res.redirect('/userSign_up')
  }
  
}
const resetOTPverification = async(req,res)=>{
  try {
   let Otp = req.body.otp
   const checkOTP = await otp.findOne({otp:Otp})
   if(checkOTP){
    req.session.resetOTP = false;
    req.session.resetOTP = true;
    await otp.deleteOne({ otp:Otp });
     res.redirect('/passchange')

   }else{
    res.render('user/forgOTP',{wrong:"invalid OTP"})
   }

    
  } catch (error) {
    console.log(error.message);
  }
}

const passwordUpdate = async(req,res)=>{
  try {
    const newpass = req.body.password
    const email = req.session.restuser
    const passwordHash = await bcryptjs.hash(newpass,10)
    const updateNow = await User.updateOne({email:email},{$set:{password:passwordHash}}).then(()=>{
      req.session.restuser = false;
      req.session.resetOTP = false
      res.redirect('/login')
 
    })
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  userlogin,
  usersign,
  userInsert,
  userverificate,
  homeLo,
  user_otp,
  profile,
  forgPass,
  passChange,
  forgOTP,
  resetOTPverification,
  passwordChange,
  passwordUpdate,



};
