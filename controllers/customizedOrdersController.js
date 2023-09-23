const db = require("../models");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const CustomizedOrders = db.customizedOrders;

//POST
const addCustomizedOrder = asyncHandler(async (req, res) => {
  const { DeliveryDate, ItemName, ModelNumber } = req.body;
  if (
    DeliveryDate === undefined ||
    DeliveryDate.trim() === "" ||
    ItemName === undefined ||
    ItemName.trim() === "" ||
    ModelNumber === undefined ||
    ModelNumber.trim() === ""
  ) {
    res.status(400);
    throw new Error(
      "DeliveryDate,ItemName,ModelNumber is mandatory, Check the request Body"
    );
  }
  const customizedOrder = await CustomizedOrders.create({
    DeliveryDate,
    ItemName,
    ModelNumber,
  });

  res.status(201).json(customizedOrder);
});

//GET
const getCustomizedOrder = asyncHandler(async (req, res) => {
  const deliveryDate = req.params.deliveryDate;
  const condition = deliveryDate ? { DeliveryDate: deliveryDate } : null;
  if (condition == null) {
    res.status(400);
    throw new Error("DeliveryDate is mandatory, Check the params");
  }
  const orders = await CustomizedOrders.findAll({ where: condition });
  if (_.isEmpty(orders)) {
    res.status(404);
    throw new Error("Orders Not Found");
  }
  res.status(200).json(orders);
});

//GET
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await CustomizedOrders.findAll();
  if (_.isEmpty(orders)) {
    res.status(404);
    throw new Error("Orders Not Found");
  }
  res.status(200).json(orders);
});

//GET
const getOrderByModelNumber = asyncHandler(async (req, res) => {
  const modelNumber = req.params.modelNumber;
  const condition = modelNumber ? {ModelNumber :  modelNumber } : null;
  if (condition == null) {
    res.status(400);
    throw new Error("ModelNumber is mandatory, Check the params");
  }
  const orders = await CustomizedOrders.findOne({ where: condition });
  if (orders == null) {
    res.status(404);
    throw new Error("Orders Not Found");
  }
  res.status(200).json(orders);
});

//DELETE
const deleteByModelNumber = asyncHandler(async (req, res) => {
    const modelNumber = req.params.modelNumber;
    const condition = modelNumber ? {ModelNumber :  modelNumber } : null;
    if (condition == null) {
      res.status(400);
      throw new Error("ModelNumber is mandatory, Check the params");
    }
    const orders = await CustomizedOrders.findOne({ where: condition });
    if (orders == null) {
      res.status(404);
      throw new Error("Orders Not Found");
    }
    await CustomizedOrders.destroy({where : condition})
    res.status(200).json({message : "Deleted Successfully"});
  });

module.exports = {
    getOrderByModelNumber,
    getAllOrders,
    getCustomizedOrder,
    addCustomizedOrder,
    deleteByModelNumber
}
