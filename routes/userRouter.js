const express = require("express");
const router = express.Router();
const sessions = require('express-session');

const auth = require('../middleware/auth/user/auth')

const checkoutController = require('../controller/user/checkout')
const productController=require('../controller/user/productController')
const userController = require('../controller/user/userController')
const cartController = require('../controller/user/cartController')
const wishlistController = require('../controller/user/wishlist')
const orderController = require('../controller/user/oderController')


router.get('/login',auth.userVerfiy,auth.userBlock,userController.userlogin)
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
router.get('/cart',auth.userVerfiy,auth.userBlock,cartController.viewcart)
router.post('/addToCart',cartController.addToCart)
router.post('/change-quantity',auth.userVerfiy,auth.userBlock,cartController.changeQuantity)
router.get('/delete-cart',auth.userVerfiy,auth.userBlock,cartController.deleteCart)
/*----------------------------------checkout---------------------------------------*/
router.post('/profile',auth.userVerfiy,auth.userBlock,checkoutController.insertaddress)
router.post('/add',auth.userVerfiy,auth.userBlock,checkoutController.addAddress)
router.get('/profile',auth.userVerfiy,auth.userBlock,checkoutController.showAddress)
router.get('/adddelete',auth.userVerfiy,auth.userBlock,checkoutController.addDelete)
router.get('/editAdd',auth.userVerfiy,auth.userBlock,checkoutController.editAddress)
router.post('/editAdd',auth.userVerfiy,auth.userBlock,checkoutController.Addupdate)
router.get('/setdefault',auth.userVerfiy,auth.userBlock,checkoutController.defaultSet)
router.get('/payment',auth.userVerfiy,auth.userBlock,checkoutController.payment)
router.post('/payment',auth.userVerfiy,auth.userBlock,checkoutController.changeOption)
router.post('/apply_coupon',checkoutController.applycoupon)
/*------------------------------wishlistManagmnt----------------------------------*/
router.get('/wishlist',wishlistController.Wishlistpage)
router.post('/addTowishlist',wishlistController.addWishlist)
router.get('/remove',auth.userVerfiy,auth.userBlock,wishlistController.removewishlist)
/*------------------------------oderManagmnt----------------------------------*/

router.post('/order_place',auth.userVerfiy,auth.userBlock,orderController.orderPlace)
router.get('/order_details',orderController.order_details)
router.get('/cancel',orderController.order_cancel)
router.get('/order_invoice',orderController.order_invoice)
router.get('/payment_success',orderController.payment_success)

module.exports=router