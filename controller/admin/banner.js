const banner = require("../../models/banner");
var sharp = require("sharp");
exports.banner_page = async (req, res) => {
  try {
    let banner_view = await banner.find();

    res.render("admin/banner", { banner_view });
  } catch (error) {
    console.log(error);
  }
};
exports.add_Banner = async (req, res) => {
  try {
    res.render("admin/addBanner");
  } catch (error) {
    console.log(error);
  }
};

exports.insert_banner = async (req, res) => {
  try {
    let bannerData = new banner({
      name: req.body.Name,
      image: req.file.filename,
    });
    await bannerData.save();
    res.redirect("/admin/banner_page");
  } catch (error) {
    console.log(error);
  }
};

exports.banner_delete = async (req, res) => {
  try {
    let data = req.body;
    let bannerId = data.bannerId;
    const remove = await banner.deleteOne({ _id: bannerId });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
