const express = require("express");
const router = express.Router();
const sessions = require('express-session');

const userController = require('../controller/user/userController')
//const auth = require ('../middleware/auth')

router.get('/login',userController.userlogin)

router.get('/userSign_up',userController.usersign)

router.post('/userSign_up',userController.userInsert)

router.post('/login',userController.userverificate)

router.get('/',userController.homeLo)

router.post('/otp',userController.user_otp)




module.exports=router