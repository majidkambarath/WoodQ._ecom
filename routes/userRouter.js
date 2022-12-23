const express = require("express");
const router = express.Router();
const sessions = require('express-session');


const productController=require('../controller/user/productController')
const userController = require('../controller/user/userController')
//const auth = require ('../middleware/auth')

router.get('/login',userController.userlogin)
router.get('/userSign_up',userController.usersign)
router.post('/userSign_up',userController.userInsert)
router.post('/login',userController.userverificate)
router.get('/',userController.homeLo)
router.post('/otp',userController.user_otp)
/*-------------------------productController---------------------------------*/
router.get('/shop',productController.shoppage)
router.get('/view_product',productController.viewpage)

module.exports=router