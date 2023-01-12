const banner = require('../../models/banner')

const banner_page = async(req,res)=>{
    try {
        let banner_view = await banner.find()
        let image = banner_view
        console.log(image);
        res.render('admin/banner',{image})

    } catch (error) {
       console.log(error.message); 
    }
}
const add_Banner = async(req,res)=>{
    try {
        res.render('admin/addBanner')
    
    } catch (error) {
       console.log(error.message); 
    }
}

const insert_banner = async(req,res)=>{
    try {
        const files = [req.files[0].filename,req.files[1].filename,req.files[2].filename];
        let bannerData = new banner({
           image:files
        })
        await bannerData.save();
        res.redirect('/admin/banner_page')
        
    } catch (error) {
       console.log(error.message); 
    }
}

module.exports = {
    banner_page,
    insert_banner,
    add_Banner
}