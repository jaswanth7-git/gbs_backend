const db = require("../models");
const Customer = db.customer;
const Sales = db.sales;
const Product = db.products;
const Category = db.category;
const asyncHandler = require("express-async-handler");
const _ = require("lodash");

const addSales = asyncHandler(async (req, res) => {
  const customer = await getCustomer(req, res);
  const product = await getProduct(req, res);
  const category = await getCategory(product, res);
  if (!req.body.StateCode) {
    res.status(400);
    throw new Error("StateCode Cannot Be null!");
  }
  const toBeSaved = {
    StateCode: req.body.StateCode,
    CustomerID: customer.CustomerID,
    ProductID: product.ProductID,
  };
  const existingSales = await Sales.findOne({ where: toBeSaved });
  if (existingSales != null) {
    res.status(409);
    throw new Error("Already Exists wth Same Data");
  }

  const sales = await Sales.create(toBeSaved);

  const salesBean = {
    CustomerName: customer.CustomerName,
    Phone: customer.Phone,
    Aadhar: customer.Aadhar,
    Pan_Card: customer.Pan_Card,
    StateCode: req.body.StateCode,
    BarCode: product.BarCode,
    ItemName_Description: product.ItemName_Description,
    CategoryName: category.CategoryName,
    HSNCode: product.HSNCode,
    GrWeight_Grams: product.GrWeight_Grams,
    NetWeight_Grams: product.NetWeight_Grams,
    Rate_Per_Gram: product.Rate_Per_Gram,
    ValAdd_RsPs: product.ValAdd_RsPs,
    Stones_RsPs: product.Stones_RsPs,
    Discount_RsPs: product.Discount_RsPs,
    Amount_RsPs: product.Amount_RsPs,
  };

  res.status(201).json(salesBean);
});

async function getCategory(product, res) {
  const condition = { ActiveStatus: 1, CategoryID: product.CategoryID };
  const category = await Category.findOne({ where: condition });
  if (category == null) {
    res.status(404);
    throw new Error("Category Is NotFound");
  }
  return category;
}

async function getProduct(req, res) {
  const condition = req.body.barCode
    ? { BarCode: req.body.barCode, ActiveStatus: 1 }
    : null;
  if (condition === null) {
    res.status(400);
    throw new Error("BarCode cannot be null or Empty");
  }
  const product = await Product.findOne({ where: condition });
  if (product == null) {
    res.status(404);
    throw new Error("Entry Not Found for the given BarCode...");
  }
  return product;
}

async function getCustomer(req, res) {
  const condition = req.params.customerName
    ? { CustomerName: req.params.customerName }
    : null;
  if (condition == null) {
    res.status(400);
    throw new Error("CustomerName is Mandatory!");
  }
  const customer = await Customer.findOne({ where: condition });
  if (customer == null) {
    res.status(404);
    throw new Error("Entry Not Found for the given CustomerName...");
  }
  return customer;
}

const getSalesByCustomerName = asyncHandler(async (req, res) => {
  const customer = await getCustomer(req, res);
  const condition = { CustomerID: customer.CustomerID };
  const sales = await Sales.findAll({ where: condition });
  if (_.isEmpty(sales)) {
    res.status(404);
    throw new Error("Entry Not Found for the given CustomerName...");
  }

  const salesBean = [];

  for (const sale of sales) {
    const product = await getProductByID(sale, res);
    const bean = {
      CustomerName: customer.CustomerName,
      Phone: customer.Phone,
      Aadhar: customer.Aadhar,
      Pan_Card: customer.Pan_Card,
      StateCode: sale.StateCode,
      BarCode: product.BarCode,
      ItemName_Description: product.ItemName_Description,
      CategoryName: category.CategoryName,
      HSNCode: product.HSNCode,
      GrWeight_Grams: product.GrWeight_Grams,
      NetWeight_Grams: product.NetWeight_Grams,
      Rate_Per_Gram: product.Rate_Per_Gram,
      ValAdd_RsPs: product.ValAdd_RsPs,
      Stones_RsPs: product.Stones_RsPs,
      Discount_RsPs: product.Discount_RsPs,
      Amount_RsPs: product.Amount_RsPs,
    };
    salesBean.push(bean);
  }

  res.status(200).json(salesBean);
});

async function getProductByID(sale, res) {
  const condition = { ActiveStatus: 1, ProductID: sale.ProductID };
  const product = await Product.findOne({ where: condition });
  if (product == null) {
    res.status(404);
    throw new Error("Entry Not Found for the given ProductID...");
  }
  return product;
}

module.exports = { addSales, getSalesByCustomerName };
