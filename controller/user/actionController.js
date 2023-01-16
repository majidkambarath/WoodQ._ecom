const User = require("../../models/userModel");
const bcryptjs = require("bcryptjs");
const securePassword = async (password) => {
  try {
    console.log("chage hash");
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

exports.about_page = (req, res) => {
  res.render("user/about");
};
exports.service_page = (req, res) => {
  res.render("user/service");
};
exports.contact_page = (req, res) => {
  res.render("user/contact");
};
exports.confirmPaswd = async (req, res) => {
  try {
    let userId = req.session.userlo;
    let password = req.body.currentpassword;

    const userData = await User.findOne({ _id: userId });
    const match = await bcryptjs.compare(password, userData.password);
    if (match) {
      const spassword = await securePassword(req.body.newPassword);
      await User.updateOne(
        { _id: userId },
        { $set: { password: spassword } }
      ).then(() => {
        res.redirect("/profile?success=password change successfly");
      });
    } else {
      res.redirect("/profile?failed=current password is not match");
    }
  } catch (error) {
    console.log(error);
  }
};
