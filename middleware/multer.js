const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: './public/admin/productImage',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now()+'.jpg');
//     }
// });
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(console.log("Multer Filter: Must upload an Image"), false);
    }
  };
  const upload = multer({ storage: multer.memoryStorage(), fileFilter: multerFilter })
// const upload = multer({ storage: multer.memoryStorage()});

module.exports = upload;