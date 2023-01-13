// const multer = require('multer');
 
// const storage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//          cb(null,'/public/productImage')
//          console.log('multer');
//     },
//     filename:(req,file,cb)=>{
//         const name = Date.now()+'-'+file.originalname;
//         cb(null,name)
//     }
    
// });
// const upload = multer({storage:storage});

// module.exports = upload;
 const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/admin/productImage',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg');
    }
});

const upload = multer({ storage: multer.memoryStorage()});

module.exports = upload;