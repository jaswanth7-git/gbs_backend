const db = require("../models");
const asyncHandler = require("express-async-handler");
const Product = db.products;
const Category = db.category;
const _ = require("lodash");
const { Op } = require("sequelize");

//@desc Get all products
//@route GET /api/products/:category
//@access private
const getProducts = asyncHandler(async (req, res) => {
  const categoryName = req.params.category;
  const condition = categoryName
    ? { CategoryName: categoryName, ActiveStatus: 1 }
    : null;
  if (condition === null) {
    res.status(400);
    throw new Error("Category cannot be null or Empty");
  }
  const categories = await Category.findAll({ where: condition });
  if (_.isEmpty(categories)) {
    res.status(404);
    throw new Error("Category not Found");
  }
  const categoryIds = categories.map((category) => category.CategoryID);

  const productCondition = categoryIds
    ? {
        CategoryID: {
          [Op.in]: categoryIds,
        },
        ActiveStatus: 1,
      }
    : null;
  const products = await Product.findAll({ where: productCondition });
  if (_.isEmpty(products)) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(products);
});

//@desc get All Products
//@route GET /api/products/
//@access private
const getAllProducts = asyncHandler(async (req, res) => {
  const productCondition = { ActiveStatus: 1 };

  const products = await Product.findAll({ where: productCondition });
  if (_.isEmpty(products)) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(products);
});

//@desc add products
//@route POST /api/products/:category
//@access private
const addProduct = asyncHandler(async (req, res) => {
  const categoryName = req.params.category;
  const branch = req.body.Branch;
  const condition = categoryName
    ? { CategoryName: categoryName, ActiveStatus: 1, Branch: branch }
    : null;
  if (condition === null) {
    res.status(404);
    throw new Error("Category cannot be null or Empty");
  }
  const category = await Category.findOne({ where: condition });
  if (category === null) {
    res.status(404);
    throw new Error("Category not Found in the Given Branch");
  }
  const {
    ItemName_Description,
    HSNCode,
    GrWeight_Grams,
    NetWeight_Grams,
    Rate_Per_Gram,
    ValAdd_RsPs,
    Stones_RsPs,
    Discount_RsPs,
    Amount_RsPs,
    BarCode_path,
    BarCode,
    Branch,
  } = req.body;
  const existingProduct = await Product.findOne({
    where: { HSNCode: HSNCode },
  });
  if (existingProduct) {
    res.status(409);
    res.json({ message: "Already Exists with the same HSNCode" });
    return;
  }

  if (
    ItemName_Description === undefined ||
    HSNCode === undefined ||
    GrWeight_Grams === undefined ||
    NetWeight_Grams === undefined ||
    Rate_Per_Gram === undefined ||
    ValAdd_RsPs === undefined ||
    Stones_RsPs === undefined ||
    Discount_RsPs === undefined ||
    Amount_RsPs === undefined ||
    BarCode_path === undefined ||
    BarCode === undefined ||
    Branch === undefined ||
    ItemName_Description.trim() === "" ||
    HSNCode.trim() === "" ||
    BarCode_path.trim() === "" ||
    BarCode.trim() === "" ||
    Branch.trim() === "" ||
    GrWeight_Grams < 0 || // Allow zero (0) value
    NetWeight_Grams < 0 || // Allow zero (0) value
    Rate_Per_Gram < 0 || // Allow zero (0) value
    ValAdd_RsPs < 0 || // Allow zero (0) value
    Stones_RsPs < 0 || // Allow zero (0) value
    Discount_RsPs < 0 || // Allow zero (0) value
    Amount_RsPs < 0 // Allow zero (0) value
  ) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const productBean = {
    ItemName_Description: req.body.ItemName_Description,
    HSNCode: req.body.HSNCode,
    GrWeight_Grams: req.body.GrWeight_Grams,
    NetWeight_Grams: req.body.NetWeight_Grams,
    Rate_Per_Gram: req.body.Rate_Per_Gram,
    ValAdd_RsPs: req.body.ValAdd_RsPs,
    Stones_RsPs: req.body.Stones_RsPs,
    Discount_RsPs: req.body.Discount_RsPs,
    Amount_RsPs: req.body.Amount_RsPs,
    BarCode_path: req.body.BarCode_path,
    BarCode: req.body.BarCode,
    Branch: req.body.Branch,
    ActiveStatus: 1,
    CategoryID: category.CategoryID,
  };

  const product = await Product.create(productBean);
  res.status(201).json(product);
});

//@desc update All Products
//@route PUT /api/products/:HSNCode
//@access private
const updateProduct = asyncHandler(async (req, res) => {
  const condition = req.params.HSNCode
    ? { HSNCode: req.params.HSNCode, ActiveStatus: 1 }
    : null;
  if (condition === null) {
    res.status(400);
    next(new Error("Please Mention Correct HSNCode"));
  }

  // Check if the product exists
  const product = await Product.findOne({
    where: condition,
  });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.update(req.body, { where: condition });
  res.status(200).json({ message: "Successfully Updated" });
});

//@desc delete Products
//@route PUT /api/products/:HSNCode
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
  const condition = req.params.HSNCode
    ? { HSNCode: req.params.HSNCode, ActiveStatus: 1 }
    : null;
  if (condition === null) {
    res.status(400);
    next(new Error("Please Mention Correct HSNCode"));
  }

  // Check if the product exists
  const product = await Product.findOne({
    where: condition,
  });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.update({ ActiveStatus: 0 }, { where: condition });
  res.status(200).json({ message: "Successfully Deleted" });
});

//@desc delete All Products
//@route DELETE /api/products/
//@access private
const deleteAll = asyncHandler(async (req, res) => {
  await Product.destroy();
  res.status(200).json({ message: "Table truncated successfully." });
});

//@desc GET Products By BarCode
//@route GET /api/products/BarCode
//@access private
const getProductByBarcode = asyncHandler(async (req, res) => {
  const barCode = req.params.barCode;
  const condition = barCode
    ? {
        BarCode: barCode,
      }
    : null;
  if (condition == null) {
    res.status(400);
    throw new Error("Please Mention Correct HSNCode");
  }
  const product = await Product.findOne({ where: condition });
  if (product == null) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

module.exports = {
  getProducts,
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  deleteAll,
  getProductByBarcode,
};
