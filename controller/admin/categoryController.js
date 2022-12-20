const category = require("../../models/categoryModel");

const categoryPage = async (req, res) => {
  const categorySave = await category.find();
  res.render("admin/category", { categorySave });
};

const addCategory = async (req, res) => {
  res.render("admin/addCategory");
};
//inserting category

const categoryInsert = async (req, res) => {
  try {
    const categoryDate = new category({
      category: req.body.category,
      image: req.file.filename,
    });
    console.log(req.file);
    categoryDate.save();
    const categorySave = await category.find();
    console.log(categorySave);

    res.redirect("/admin/category");
    console.log("inserting sucess");
  } catch (error) {
    console.log(error.message);
  }
};

const cateEdit = async (req, res) => {
  try {
    const id = req.query.id;

    const categoryStore = await category.findById({ _id: id });
    if (categoryStore) {
      res.render("admin/editCate.ejs", { cate:categoryStore });
      console.log("category add category");
    } else {
      res.redirect("/admin/category");
    }
  } catch (error) {
    console.log(error.message);
    res.redirect("/admin/category");
  }
};

const cateUpdate = async (req, res) => {
  try {
    const id = req.query.id;
    const inputCategory = req.body.category;
    const image = req.file.filename;
    const categg = await category.findByIdAndUpdate({ _id: id },{ $set: { inputCategory, image } });
    res.redirect("/admin/category");
    console.log("update success");
  } catch (error) {
    console.log(error.message);
  }
};

const cateDelete = async (req, res) => {
  try {
    const id = req.query.id;
    const Delete = await category.findByIdAndDelete({ _id: id });
    res.redirect("/admin/category");
    console.log("delete category");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  categoryPage,
  categoryInsert,
  addCategory,
  cateEdit,
  cateUpdate,
  cateDelete,
};
