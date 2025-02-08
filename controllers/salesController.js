const db = require("../models");
const Sales = db.sales;
const asyncHandler = require("express-async-handler");
const _ = require("lodash");

const addSales = asyncHandler(async (req, res) => {
  try {
    // List of required fields
    const requiredFields = [
      "CustomerName",
      "Aadhar",
      "Phone",
      "Pan_Card",
      "StateCode",
      "BarCode",
      "ItemName_Description",
      "CategoryName",
      "SubCategoryName",
      "HSNCode",
      "CaratType",
      "HUID",
      "TagName",
      "GrWeight_Grams",
      "NetWeight_Grams",
      "Rate_Per_Gram",
      "Making_Charge",
      "Wastage_Charge",
      "V_A",
      "Stone_Type",
      "Stone_Pieces_CTS",
      "Stone_Pieces",
      "Stones_RsPs",
      "Discount_RsPs",
      "Amount_RsPs",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]?.trim());

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing or empty fields",
        missingFields: missingFields,
      });
    }
    const salesBean = {
      CustomerName: req.body.CustomerName,
      Aadhar: req.body.Aadhar,
      Phone: req.body.Phone,
      Pan_Card: req.body.Pan_Card,
      StateCode: req.body.StateCode,
      BarCode: req.body.BarCode,
      ItemName_Description: req.body.ItemName_Description,
      CategoryName: req.body.CategoryName,
      SubCategoryName: req.body.SubCategoryName,
      HSNCode: req.body.HSNCode,
      CaratType: req.body.CaratType,
      HUID: req.body.HUID,
      TagName: req.body.TagName,
      GrWeight_Grams: req.body.GrWeight_Grams,
      NetWeight_Grams: req.body.NetWeight_Grams,
      Rate_Per_Gram: req.body.Rate_Per_Gram,
      Making_Charge: req.body.Making_Charge,
      Wastage_Charge: req.body.Wastage_Charge,
      V_A: req.body.V_A,
      Stone_Type: req.body.Stone_Type,
      Stone_Pieces_CTS: req.body.Stone_Pieces_CTS,
      Stone_Pieces: req.body.Stone_Pieces,
      Stones_RsPs: req.body.Stones_RsPs,
      Discount_RsPs: req.body.Discount_RsPs,
      Amount_RsPs: req.body.Amount_RsPs,
      SchemeAmount : req.body.SchemeAmount,
      AdvanceAmount : req.body.AdvanceAmount
    };
    const existingSalesEntry = await Sales.findOne({ where: salesBean });
    if (existingSalesEntry) {
      return res.status(409).json({ message: "Sales entry already exists with the same data." });
    }
    const sales = await Sales.create(salesBean);
    return res.status(201).json(sales);
  } catch (error) {
    console.error("Error adding sales:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});
// const addSales = asyncHandler(async (req, res) => {
//   try {
//     const salesBean = checkRequestBodyAndPrepareBean(req, res);
//     const existingSalesEntry = await Sales.findOne({ where: salesBean });
//     if (existingSalesEntry) {
//       return res.status(409).json({ message: "Sales entry already exists with the same data." });
//     }
//     const sales = await Sales.create(salesBean);
//     return res.status(201).json(sales);
//   } catch (error) {
//     console.error("Error adding sales:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// });
// function checkRequestBodyAndPrepareBean(req, res) {
//   const {
//     CustomerName,
//     Aadhar,
//     Phone,
//     Pan_Card,
//     StateCode,
//     BarCode,
//     ItemName_Description,
//     CategoryName,
//     SubCategoryName,
//     HSNCode,
//     CaratType,
//     HUID,
//     TagName,
//     GrWeight_Grams,
//     NetWeight_Grams,
//     Rate_Per_Gram,
//     Making_Charge,
//     Wastage_Charge,
//     V_A,
//     Stone_Type,
//     Stone_Pieces_CTS,
//     Stone_Pieces,
//     Stones_RsPs,
//     Discount_RsPs,
//     Amount_RsPs,
//   } = req.body;

//   if (
//     CustomerName === undefined ||
//     CustomerName.trim() === "" ||
//     Aadhar === undefined ||
//     Aadhar.trim() === "" ||
//     Phone === undefined ||
//     Phone.trim() === "" ||
//     Pan_Card === undefined ||
//     Pan_Card.trim() === "" ||
//     StateCode === undefined ||
//     StateCode.trim() === "" ||
//     BarCode === undefined ||
//     BarCode.trim() === "" ||
//     ItemName_Description === undefined ||
//     ItemName_Description.trim() === "" ||
//     CategoryName === undefined ||
//     CategoryName.trim() === "" ||
//     SubCategoryName === undefined ||
//     SubCategoryName.trim() === "" ||
//     HSNCode === undefined ||
//     HSNCode.trim() === "" ||
//     CaratType === undefined ||
//     CaratType.trim() === "" ||
//     HUID === undefined ||
//     HUID.trim() === "" ||
//     TagName === undefined ||
//     TagName.trim() === "" ||
//     GrWeight_Grams === undefined ||
//     GrWeight_Grams.trim() === "" ||
//     NetWeight_Grams === undefined ||
//     NetWeight_Grams.trim() === "" ||
//     Rate_Per_Gram === undefined ||
//     Rate_Per_Gram.trim() === "" ||
//     Making_Charge === undefined ||
//     Making_Charge.trim() === "" ||
//     Wastage_Charge === undefined ||
//     Wastage_Charge.trim() === "" ||
//     V_A === undefined ||
//     V_A.trim() === "" ||
//     Stone_Type === undefined ||
//     Stone_Type.trim() === "" ||
//     Stone_Pieces_CTS === undefined ||
//     Stone_Pieces_CTS.trim() === "" ||
//     Stone_Pieces === undefined ||
//     Stone_Pieces.trim() === "" ||
//     Stones_RsPs === undefined ||
//     Stones_RsPs.trim() === "" ||
//     Discount_RsPs === undefined ||
//     Discount_RsPs.trim() === "" ||
//     Amount_RsPs === undefined ||
//     Amount_RsPs.trim() === ""
//   ) {
//     res.status(400);
//     throw new Error("All fields are mandatory!");
//   }

//   const salesBean = {
//     CustomerName: CustomerName,
//     Aadhar: Aadhar,
//     Phone: Phone,
//     Pan_Card: Pan_Card,
//     StateCode: StateCode,
//     BarCode: BarCode,
//     ItemName_Description: ItemName_Description,
//     CategoryName: CategoryName,
//     SubCategoryName: SubCategoryName,
//     HSNCode: HSNCode,
//     CaratType: CaratType,
//     HUID: HUID,
//     TagName: TagName,
//     GrWeight_Grams: GrWeight_Grams,
//     NetWeight_Grams: NetWeight_Grams,
//     Rate_Per_Gram: Rate_Per_Gram,
//     Making_Charge: Making_Charge,
//     Wastage_Charge: Wastage_Charge,
//     V_A: V_A,
//     Stone_Type: Stone_Type,
//     Stone_Pieces_CTS: Stone_Pieces_CTS,
//     Stone_Pieces: Stone_Pieces,
//     Stones_RsPs: Stones_RsPs,
//     Discount_RsPs: Discount_RsPs,
//     Amount_RsPs: Amount_RsPs,
//   };
//   return salesBean;
// }

const getAllSalesData = asyncHandler(async (req, res) => {
  try {
  const salesData = await Sales.findAll();
  if (salesData.length == 0 || salesData == null) {
    res.status(404);
    throw new Error("Entries Not Found in the Sales Table");
  }

  res.status(200).json(salesData);
} catch (error) {
  throw error;
}
});

const getSalesDataByHUID = asyncHandler(async (req, res) => {
  try {
  const condition = req.params.HUID ? { HUID: req.params.HUID } : null;
  if (condition == null) {
    res.status(400);
    throw new Error("HUID is Mandatory Please Check Params Correctly");
  }
  const sales = await Sales.findOne({ where: condition });
  if (sales == null) {
    res.status(404);
    throw new Error(
      "Entry Not Found Please Check HUID Code : " + req.params.HUID
    );
  }

  res.status(200).json(sales);
} catch (error) {
  throw error;
}
});

const getSalesBySalesID = asyncHandler(async (req, res) => {
  try {
  const SalesID = req.params.SalesID ? req.params.SalesID : null;
  if (SalesID == null) {
    res.status(400);
    throw new Error("Sales ID is Mandatory");
  }
  if (isNaN(SalesID)) {
    res.status(400);
    throw new Error("SalesID Should be numeric please check and try again");
  }
  const condition = { SalesID: SalesID };
  const sales = await Sales.findOne({ where: condition });
  if (sales == null) {
    res.status(404);
    throw new Error("Entry Not Found Please Check SalesID : " + SalesID);
  }
  res.status(200).json(sales);
} catch (error) {
  throw error;
}
});

module.exports = { addSales, getAllSalesData, getSalesDataByHUID,getSalesBySalesID };
