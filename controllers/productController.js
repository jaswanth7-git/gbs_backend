const db = require("../models");
const asyncHandler = require("express-async-handler");
const Product = db.products;
const Category = db.category;
const _ = require("lodash");
const { Op } = require("sequelize");
const { getCategoryBasedOnID } = require("./categoryController");

//@desc Get all products
//@route GET /api/products/:category
//@access private
const getProducts = asyncHandler(async (req, res) => {
  try {
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
} catch (error) {
  throw error;
}
});

//@desc get All Products
//@route GET /api/products/
//@access private
// const getAllProducts = asyncHandler(async (req, res) => {
//   try {
//   const productCondition = { ActiveStatus: 1 };

//   const products = await Product.findAll({ where: productCondition });
//   if (_.isEmpty(products)) {
//     res.status(404);
//     throw new Error("Product not found");
//   }
//   res.status(200).json(products);
// } catch (error) {
//   throw error;
// }
// });

//@desc get All Products
//@route GET /api/products/
//@access private
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const productCondition = { ActiveStatus: 1 };
    const products = await Product.findAll({
      where: productCondition,
      include: [
        {
          model: Category,
          as: "category", 
          attributes: ["SubCategoryName"],
        },
      ],
    });

    if (_.isEmpty(products)) {
      res.status(404);
      throw new Error("Product not found");
    }
    const productsWithSubCategory = products.map((product) => {
      return {
        ...product.toJSON(),
        SubCategoryName: product.category ? product.category.SubCategoryName : null,
      };
    });

    res.status(200).json(productsWithSubCategory);
  } catch (error) {
    throw error;
  }
});

//@desc add products
//@route POST /api/products/:category
//@access private
const addProduct = asyncHandler(async (req, res) => {
  try {
    const { categoryName, SubCategoryName, ...productData } = req.body;
    if (!categoryName || !SubCategoryName ) {
      return res.status(400).json({ message: "Category, SubCategory are required." });
    }
    const category = await Category.findOne({
      where: {
        CategoryName: categoryName,
        SubCategoryName: SubCategoryName,
        ActiveStatus: 1,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found in the given branch." });
    }

    // Validate product data
    const requiredFields = [
      "ItemName_Description",
      "HUID",
      "TagName",
      "BarCode_Prefix",
      "GrWeight_Grams",
      "NetWeight_Grams",
      "Rate_Per_Gram",
      "Making_Charge",
      "Making_Direct",
      "Wastage_Charge",
      "Wastage_Direct",
      "V_A",
      "Stone_Type",
      "Stone_Pieces_CTS",
      "Stone_Pieces",
      "Stones_RsPs",
      "Discount_RsPs",
      "Amount_RsPs",
      "BarCode",
    ];

    for (const field of requiredFields) {
      if (!productData[field]?.trim()) {
        return res.status(400).json({ message: `Field '${field}' is mandatory.` });
      }
    }

    const existingProduct = await Product.findOne({
      where: { BarCode: productData.BarCode},
    });

    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists with the same BarCode." });
    }
    const product = await Product.create({
      ...productData,
      ActiveStatus: 1,
      CategoryID: category.CategoryID, 
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  try {
  const condition =
    req.params.HSNCode && req.params.HUID
      ? { HSNCode: req.params.HSNCode, HUID: req.params.HUID, ActiveStatus: 1 }
      : null;
  if (condition === null) {
    res.status(400);
    next(new Error("Please Mention Correct HSNCode An HUID"));
  }

  // Check if the product exists
  const product = await Product.findOne({
    where: condition,
  });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const [count, [updatedProduct]] = await Product.update(req.body, {
    where: condition,
    returning: true, // Set to true to return the updated record
  });
  if (count === 0) {
    res.status(404);
    next(
      new Error(
        "Entry Not Found for the given Product HUID and HSNCode To Update ..."
      )
    );
  }
  res.status(200).json(updatedProduct);
} catch (error) {
  throw error;
}
});

//@desc delete Products
//@route PUT /api/products/:HSNCode
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
  try {
  const condition =
    req.params.HSNCode && req.params.HUID
      ? { HSNCode: req.params.HSNCode, HUID: req.params.HUID, ActiveStatus: 1 }
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
} catch (error) {
  throw error;
}
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
  try {
  const barCode = req.params.barCode;
  const condition = barCode
    ? {
        BarCode: barCode,
        ActiveStatus: 1,
      }
    : null;
  if (condition == null) {
    res.status(400);
    throw new Error("Please Mention BarCode");
  }
  const product = await Product.findOne({ where: condition });
  if (product == null) {
    res.status(404);
    throw new Error("Product not found");
  }
  const category = await getCategoryBasedOnID(product.CategoryID, res);
  if (category == null) {
    res.status(404);
    throw new Error("Category Not Found");
  }
  const { CaratType, CategoryName, SubCategoryName, Quantity } =
    category;
  const productWithCategory = {
    ...product.toJSON(),
    CaratType, CategoryName, SubCategoryName, Quantity,
  };

  res.status(200).json(productWithCategory);
} catch (error) {
  throw error;
}
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
