const express = require("express");
const router = express.Router();
const sessions = require('express-session');

const auth = require('../middleware/auth/login/auth')

const productController=require('../controller/user/productController')
const userController = require('../controller/user/userController')
const shopController = require('../controller/user/shopController')

router.get('/login',userController.userlogin)
router.get('/userSign_up',userController.usersign)
router.post('/userSign_up',userController.userInsert)
router.post('/login',userController.userverificate)
router.get('/',userController.homeLo)
router.post('/otp',userController.user_otp)
router.get('/profile',userController.profile)
/*-------------------------productController---------------------------------*/
router.get('/shop',productController.shoppage)
router.get('/view_product',productController.viewpage)
/*------------------------------cartManagmnt----------------------------------*/
router.get('/cart',auth.userVerfiy,shopController.viewcart)
router.get('/addToCart/:id',shopController.addToCart)

module.exports=router