const express = require("express");
const router = express.Router();
const sessions = require('express-session');
const upload = require('../middleware/multer')

const orderController = require('../controller/admin/order')
const couponController = require('../controller/admin/coupon')
const admincontroller = require('../controller/admin/adminController')
const productController = require('../controller/admin/productController')
const categoryController = require('../controller/admin/categoryController')
const custmoerController = require('../controller/admin/customer.Controller')
const bannerController = require('../controller/admin/banner')
//seesion middleware
//admin&&product side

router.get('/',admincontroller.dashboard)
router.get('/login',admincontroller.login)
router.post('/login',admincontroller.adminveri)
router.get('/product',productController.loProduct)
router.post('/product',upload.array('image',4),productController.inserProduct)
router.get('/product_page',productController.productPost)
router.get('/product_edit',productController.productEdit)
router.post('/product_edit',upload.single('image'),productController.productUpadte)
router.get('/product_delete',productController.productDelete)
router.get('/logout',admincontroller.adminlogout)
/*----------------------------------category page---------------------------------*/
router.get('/category',categoryController.categoryPage)
router.get('/category_add',categoryController.addCategory)
router.post('/category_add',upload.single('image'),categoryController.categoryInsert)
router.get('/category_edit',categoryController.cateEdit)
router.post('/category_edit',upload.single('image'),categoryController.cateUpdate)
router.get('/category_delete',categoryController.cateDelete)
/*----------------------------------custmoer page---------------------------------*/
router.get('/custmoer_page',custmoerController.custmoerPage)
router.get('/custmoer_block',custmoerController.userBlock)
/*----------------------------------banner mangement---------------------------------*/
router.get('/banner_page',bannerController.banner_page)
router.get('/add_banner',bannerController.add_Banner)
router.post('/add_banner',upload.array('image',3),bannerController.insert_banner)
/*----------------------------------coupon---------------------------------*/
router.get('/coupon_page',couponController.coupon_page)
router.get('/add_coupon',couponController.add_Coupon_page)
router.post('/add_coupon',couponController.coupon_insert)
router.get('/coupon_block',couponController.coupon_blocking)

router.get('/order_page',orderController.order_page)
router.patch('/order_update',orderController.order_upte)
router.get('/saleReport',orderController.saleReport)
module.exports = router
