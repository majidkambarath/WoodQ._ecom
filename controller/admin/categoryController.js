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
   const categoryy = req.body.category.toUpperCase()
   const cata = await category.findOne({category:categoryy})
   if(cata){
    res.render("admin/addCategory",{wrong:"Already Exited Category"} );
   }else{
    const categoryDate = new category({
      category: req.body.category.toUpperCase(),
    });

    categoryDate.save();
    // const categorySave = await category.find();
    // console.log(categorySave);

    res.redirect("/admin/category");
    console.log("inserting sucess");
   }

  } catch (error) {
    console.log(error.message);
    res.redirect("/500");
  }
};

let categoryStore;
const cateEdit = async (req, res) => {
  try {
    const id = req.query.id;

    categoryStore = await category.findById({ _id: id });

    if (categoryStore) {
      res.render("admin/editCate.ejs", { cate: categoryStore });
   
    } else {
      res.redirect("/admin/category");
    }
  } catch (error) {
    console.log(error.message);
    res.redirect("/500");
  }
};

const cateUpdate = async (req, res) => {
  try {
    const id = req.query.id;
    const inputCategory = req.body.category.toUpperCase();
    console.log(inputCategory);
    //const inputImage = req.file.filename;
    let chack = await category.findOne({category:inputCategory})
    console.log(chack);
    if (chack) {
      res.render("admin/editCate", {
        wrong: "Already exited catagory",
        cate: categoryStore,
      });
    } else {
      const categg = await category.findByIdAndUpdate(id, {
        $set: { category: inputCategory },
      });
      res.redirect("/admin/category");
      console.log("update success");
    }
  } catch (error) {
    console.log(error.message);
    res.redirect("/500");
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
