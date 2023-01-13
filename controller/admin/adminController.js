const dashboard = async (req, res) => {
  res.render("admin/admin.ejs");
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
