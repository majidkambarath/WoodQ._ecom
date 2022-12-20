const express = require("express");
const router = express.Router();
const sessions = require('express-session');
const upload = require('../middleware/multer')
// const upload = multer({storage});
// const { storage , cloudinary } = require('../middleware/cloudinary');

const admincontroller = require('../controller/admin/adminController')
const productController = require('../controller/admin/productController')
const categoryController = require('../controller/admin/categoryController')
const custmoerController = require('../controller/admin/customer.Controller')
//admin&&product side
router.get('/',admincontroller.dashboard)
router.get('/product',productController.loProduct)
router.post('/product',upload.single('image'),productController.inserProduct)
router.get('/product_page',productController.productPost)
router.get('/product_edit',productController.productEdit)
router.post('/product_edit',upload.single('image'),productController.productUpadte)
router.get('/product_delete',productController.productDelete)

//category side
router.get('/category',categoryController.categoryPage)
router.get('/category_add',categoryController.addCategory)
router.post('/category_add',upload.single('image'),categoryController.categoryInsert)
router.get('/category_edit',categoryController.cateEdit)
router.post('/category_edit',upload.single('image'),categoryController.cateUpdate)
router.get('/category_delete',categoryController.cateDelete)
//custmoer page
router.get('/custmoer_page',custmoerController.custmoerPage)
router.get('/custmoer_block',custmoerController.userBlock)
module.exports = router