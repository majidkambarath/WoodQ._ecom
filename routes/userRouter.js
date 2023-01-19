const express = require("express");
const router = express.Router();
const sessions = require('express-session');

//{{controller}}
const auth = require('../middleware/auth/user/auth')
const checkoutController = require('../controller/user/checkout')
const productController=require('../controller/user/productController')
const userController = require('../controller/user/userController')
const cartController = require('../controller/user/cartController')
const wishlistController = require('../controller/user/wishlist')
const orderController = require('../controller/user/oderController')
const actionController = require('../controller/user/actionController')
//{{Routers}}
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
router.post('/confirmPassword',actionController.confirmPaswd)
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
router.post('/apply_coupon',auth.userVerfiy,auth.userBlock,checkoutController.applycoupon)
/*------------------------------wishlistManagmnt----------------------------------*/
router.get('/wishlist',auth.userVerfiy,auth.userBlock,wishlistController.Wishlistpage)
router.post('/addTowishlist',wishlistController.addWishlist)
router.get('/remove',auth.userVerfiy,auth.userBlock,wishlistController.removewishlist)
/*------------------------------oderManagmnt----------------------------------*/
router.post('/order_place',auth.userVerfiy,auth.userBlock,orderController.orderPlace)
router.get('/order_details',auth.userVerfiy,auth.userBlock,orderController.order_details)
router.get('/cancel',auth.userVerfiy,auth.userBlock,orderController.order_cancel)
router.get('/order_invoice',auth.userVerfiy,auth.userBlock,orderController.order_invoice)
router.get('/payment_success',auth.userVerfiy,auth.userBlock,orderController.payment_success)
/*------------------------------Actions----------------------------------*/
router.get('/about',auth.userBlock,actionController.about_page)
router.get('/service',auth.userBlock,actionController.service_page)
router.get('/contact',auth.userBlock,actionController.contact_page)
router.post('/search',auth.userBlock,actionController.searchData)
router.get('/error',auth.userBlock,actionController.error_page)
router.get('/500',auth.userBlock,actionController.error500_page)
router.delete('/history_Clean',auth.userBlock,actionController.history_clean)
module.exports=router