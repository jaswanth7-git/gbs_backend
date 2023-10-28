const db = require("../models");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const CustomizedOrders = db.customizedOrders;

//POST
const addCustomizedOrder = asyncHandler(async (req, res) => {
  try {
    const {
      DeliveryDate,
      ItemName,
      ModelNumber,
      Weight,
      Making_Charge,
      Wastage,
      Gram_Rate,
      Advance_Amount,
      OrderedDate,
    } = req.body;
    if (
      DeliveryDate === undefined ||
      DeliveryDate.trim() === "" ||
      ItemName === undefined ||
      ItemName.trim() === "" ||
      ModelNumber === undefined ||
      ModelNumber.trim() === "" ||
      Weight === undefined ||
      Weight.trim() === "" ||
      Making_Charge === undefined ||
      Making_Charge.trim() === "" ||
      Wastage === undefined ||
      Wastage.trim() === "" ||
      Gram_Rate === undefined ||
      Gram_Rate.trim() === "" ||
      Advance_Amount === undefined ||
      Advance_Amount.trim() === "" ||
      OrderedDate === undefined ||
      OrderedDate.trim() === ""
    ) {
      res.status(400);
      throw new Error(
        "DeliveryDate, ItemName, ModelNumber, Weight, Making_Charge, Wastage, Gram_Rate, Advance_Amount are mandatory, Check the request Body"
      );
    }
    const customizedOrder = await CustomizedOrders.create({
      DeliveryDate,
      ItemName,
      ModelNumber,
      Weight,
      Making_Charge,
      Wastage,
      Gram_Rate,
      Advance_Amount,
      OrderedDate,
    });

    res.status(201).json(customizedOrder);
  } catch (error) {
    throw error;
  }
});

//GET
const getCustomizedOrder = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    throw error;
  }
});

//GET
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await CustomizedOrders.findAll();
    if (_.isEmpty(orders)) {
      res.status(404);
      throw new Error("Orders Not Found");
    }
    res.status(200).json(orders);
  } catch (error) {
    throw error;
  }
});

//GET
const getOrderByModelNumber = asyncHandler(async (req, res) => {
  try {
    const modelNumber = req.params.modelNumber;
    const condition = modelNumber ? { ModelNumber: modelNumber } : null;
    if (condition == null) {
      res.status(400);
      throw new Error("ModelNumber is mandatory, Check the params");
    }
    const orders = await CustomizedOrders.findOne({ where: condition });
    if (orders == null || _.isEmpty(orders)) {
      res.status(404);
      throw new Error("Orders Not Found");
    }
    res.status(200).json(orders);
  } catch (error) {
    throw error;
  }
});

//DELETE
const deleteByModelNumber = asyncHandler(async (req, res) => {
  try {
    const modelNumber = req.params.modelNumber;
    const condition = modelNumber ? { ModelNumber: modelNumber } : null;
    if (condition == null) {
      res.status(400);
      throw new Error("ModelNumber is mandatory, Check the params");
    }
    const orders = await CustomizedOrders.findOne({ where: condition });
    if (orders == null || _.isEmpty(orders)) {
      res.status(404);
      throw new Error("Orders Not Found");
    }
    await CustomizedOrders.destroy({ where: condition });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    throw error;
  }
});


/**
 * @description get Based ON the ItemName
 */
const getBasedOnName = asyncHandler(async(req,res) => {
  const itemName = req.params.itemName ? req.params.itemName : null;
  if(itemName == null) {
    res.status(400);
    throw new Error("ItemName is mandatory, Check the params");
  }
  const condition = {ItemName : itemName};
  const customizedOrder = await CustomizedOrders.findOne({ where : condition});
  if(customizedOrder == null || _.isEmpty(customizedOrder) ){
    res.status(404);
    throw new Error("Orders Not Found");
  }

  res.status(200).json(customizedOrder);
});

module.exports = {
  getOrderByModelNumber,
  getAllOrders,
  getCustomizedOrder,
  addCustomizedOrder,
  deleteByModelNumber,
  getBasedOnName
};
