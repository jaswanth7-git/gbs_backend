const db = require("../models");
const Category = db.category;
const asyncHandler = require("express-async-handler");
const _ = require("lodash");

const addCategory = asyncHandler(async (req, res, next) => {
  const { CaratType, CategoryName, SubCategoryName, Quantity, Branch } =
    req.body;
  if (!CategoryName || !Quantity || !Branch || !SubCategoryName || !CaratType) {
    res.status(400);
    next(new Error("All fields are mandatory!"));
  }

  const categoryBean = {
    CaratType: CaratType,
    CategoryName: CategoryName,
    SubCategoryName: SubCategoryName,
    Quantity: Quantity,
    Branch: Branch,
    ActiveStatus: 1,
  };

  const exists = await Category.findOne({ where: categoryBean });
  if (exists !== null) {
    res.status(400);
    throw new Error("Entry Exists With Same Data");
  }

  const category = await Category.create(categoryBean);
  res.status(201).json(category);
});

const getAllCategories = asyncHandler(async (req, res, next) => {
  const condition = { ActiveStatus: 1 };
  const categories = await Category.findAll({ where: condition });
  if (_.isEmpty(categories)) {
    res.status(404).json({ message: "No Entries found." });
  }
  res.status(200).json(categories);
});

const getCategory = asyncHandler(async (req, res, next) => {
  const categoryName = req.params.category;
  const SubCategoryName = req.params.SubCategoryName;
  const condition =
    categoryName && SubCategoryName
      ? {
          CategoryName: categoryName,
          SubCategoryName: SubCategoryName,
          ActiveStatus: 1,
        }
      : null;
  if (condition === null) {
    res.status(400);
    next(new Error("Please Mention Correct CategoryName"));
  }

  const category = await Category.findAll({ where: condition });
  if (category === null) {
    res.status(404);
    next(new Error("Entry Not Found for the given Category..."));
  }
  res.status(200).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const categoryName = req.params.category;
  const SubCategoryName = req.params.SubCategoryName;
  const condition =
    categoryName && SubCategoryName
      ? {
          CategoryName: categoryName,
          SubCategoryName: SubCategoryName,
          ActiveStatus: 1,
        }
      : null;
  if (condition === null) {
    res.status(400);
    new Error("Please Mention Correct CategoryName");
  }
  const category = await Category.findOne({ where: condition });
  if (category === null) {
    res.status(404);
    new Error("Entry Not Found for the given Category...");
  }
  const [count, [updatedCategory]] = await Category.update(req.body, {
    where: condition,
    returning: true, // Set to true to return the updated record
  });
  if (count === 0) {
    res.status(404);
    new Error("Entry Not Found for the given Category To Update ...");
  }
  res.status(200).json(updatedCategory);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const categoryName = req.params.category;
  const SubCategoryName = req.params.SubCategoryName;
  const condition =
    categoryName && SubCategoryName
      ? {
          CategoryName: categoryName,
          SubCategoryName: SubCategoryName,
          ActiveStatus: 1,
        }
      : null;
  if (condition === null) {
    res.status(400);
    new Error("Please Mention Correct CategoryName");
  }
  const category = await Category.findOne({ where: condition });
  if (category === null) {
    res.status(404);
    new Error("Entry Not Found for the given Category...");
  }
  // Update the category's ActiveStatus to 0
  await Category.update({ ActiveStatus: 0 }, { where: condition });

  res.status(200).json({ message: "Successfully Deleted" });
});

const deleteAll = asyncHandler(async (req, res, next) => {
  await Category.destroy({ where: {} });
  res.status(200).json({ message: "Table truncated successfully." });
});

const getCategoryByID = asyncHandler(async(req,res)=>{
const ID = req.params.CategoryID;
  const category = await getCategoryBasedOnID(ID, res);
res.status(200).json(category);
});

async function getCategoryBasedOnID(ID, res) {
  const condition = ID ? { CategoryID: ID } : null;
  if (condition == null) {
    res.status(400);
    new Error("CategoryID is Null ... ");
  }
  const category = await Category.findOne({ where: condition });
  if (category == null) {
    res.status(404);
    new Error("Category Not Found ....");
  }
  return category;
}

module.exports = {
  deleteAll,
  deleteCategory,
  updateCategory,
  getAllCategories,
  addCategory,
  getCategory,
  getCategoryBasedOnID,
  getCategoryByID
};

