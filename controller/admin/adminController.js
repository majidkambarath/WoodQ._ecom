const order = require('../../models/order')
const dashboard = async (req, res) => {
  try {
    const find = await order.find()
    const sum = find.reduce((acc ,cur)=>{
      acc = acc + cur.totalPrice;
      return acc;
    },0)
   
    res.render("admin/admin.ejs",{sum});
  } catch (error) {
    console.log(error);
  }
  
};

const login = async (req, res) => {
  if(req.session.admin){
    res.redirect('/admin') ;

  }else{
   
    res.render('admin/adminlo')
  }
};

const adminveri = async (req, res) => {
  const email = "admin@gmail.com";
  const password = "123";
  //console.log(req.body);

  if (req.body.email === email && req.body.password === password) {
    req.session.admin = req.body.email;
    console.log(req.session.admin);
    res.redirect("/admin");
  } else {
    res.render("admin/adminlo", { wrong: "Admin not found" });
  }
};


module.exports = {
  dashboard,
  login,
  adminveri,

};
