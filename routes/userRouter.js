const express = require("express");
const router = express.Router();
const sessions = require('express-session');

const auth = require('../middleware/login/auth')
// const count = require('../middleware/login/count')
const addressController = require('../controller/user/address')
const productController=require('../controller/user/productController')
const userController = require('../controller/user/userController')
const cartController = require('../controller/user/cartController')
const wishlistController = require('../controller/user/wishlist')


router.get('/login',auth.userVerfiy,userController.userlogin)
router.get('/userSign_up',userController.usersign)
router.post('/userSign_up',userController.userInsert)
router.post('/login',userController.userverificate)
router.get('/',userController.homeLo)
router.post('/otp',userController.user_otp)
router.get('/forgPass',userController.forgPass)
router.post('/forgPass',userController.passChange)
router.get('/forgOTP',userController.forgOTP)
router.post('/forgOTP',userController.resetOTPverification)
router.get('/passchange',userController.passwordChange)
router.post('/passcahnge',userController.passwordUpdate)
router.get('/signout',auth.signOut)
/*-------------------------productController---------------------------------*/
router.get('/shop',productController.shoppage)
router.get('/view_product/:id',productController.viewpage)
/*------------------------------cartManagmnt----------------------------------*/
router.get('/cart',auth.userVerfiy,cartController.viewcart)
router.post('/addToCart',auth.userVerfiy,cartController.addToCart)
router.post('/change-quantity',auth.userVerfiy,cartController.changeQuantity)
router.get('/delete-cart',auth.userVerfiy,cartController.deleteCart)

/*----------------------------------adresss---------------------------------*/
router.post('/profile',auth.userVerfiy,addressController.insertaddress)
router.post('/add',auth.userVerfiy,addressController.addAddress)
router.get('/profile',auth.userVerfiy,addressController.showAddress)
router.get('/adddelete',auth.userVerfiy,addressController.addDelete)
router.get('/editAdd',auth.userVerfiy,addressController.editAddress)
router.post('/editAdd',auth.userVerfiy,addressController.Addupdate)
router.get('/setdefault',auth.userVerfiy,addressController.defaultSet)
router.get('/payment',auth.userVerfiy,addressController.payment)
router.post('/payment',auth.userVerfiy,addressController.changeOption)
/*------------------------------wishlistManagmnt----------------------------------*/
router.get('/wishlist',wishlistController.Wishlistpage)
router.post('/addTowishlist',wishlistController.addWishlist)
router.get('/remove',auth.userVerfiy,wishlistController.removewishlist)

module.exports=router