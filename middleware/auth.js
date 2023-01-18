// const jwt = require('jsonwebtoken');
// const config = require('../config/config')

// const verifyToken = async(req,res,next)=>{
//     const token = req.body.token || req.query.token || req.headers['authorization'];
//     if(!token){
//         res.send('ok')
//     // }else{
//     //     //res.render('user/home.ejs')
//     //     res.send('home')
//     }  
//     try {
//        const descode = jwt.verify(token,config.secret_jwt)
//         req.user = descode
        
//     } catch (error) {
//         console.log(error.meassge);
//     }
//     return next();
// }


// module.exports = verifyToken;