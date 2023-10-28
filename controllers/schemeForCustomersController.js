const db = require("../models");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const { getCustomerByPhoneNumber } = require("./customerController");
const SchemeForCustomers = db.schemeForCustomers;

/**
 * @RequestBody SchemeName, MobileNumber
 * @POST
 */
const addSchemes = asyncHandler(async (req, res) => {
  try {
  const { SchemeName, MobileNumber, SchemeAmount, SchemeDesc } = req.body;
  if (
    SchemeName === undefined ||
    SchemeName.trim() === "" ||
    MobileNumber === undefined ||
    MobileNumber.trim() === "" ||
    SchemeAmount === undefined ||
    SchemeAmount.trim() === "" ||
    SchemeDesc === undefined ||
    SchemeDesc.trim() === ""
  ) {
    res.status(400);
    throw new Error(
      "SchemeName and MobileNumber is mandatory, Check the request Body"
    );
  }
  const customer = await getCustomerByPhoneNumber(MobileNumber, res);
  const schemeBean = {
    SchemeName: SchemeName,
    MobileNumber: MobileNumber,
    SchemeAmount: SchemeAmount,
    SchemeDesc: SchemeDesc,
    CustomerName: customer.CustomerName,
    CustomerID: customer.CustomerID,
  };
  const schemeForCustomers = await SchemeForCustomers.create(schemeBean);
  if (schemeForCustomers == null) {
    res.status(404);
    throw new Error("Scheme is Not Added");
  }
  res.status(201).json(schemeForCustomers);
} catch (error) {
  res.status(500);
  throw new Error("Internal Server Error");
}
});

/**
 * @returns SchemeForCustomers
 */
const getAllSchemes = asyncHandler(async (req, res) => {
  try {
  const schemes = await SchemeForCustomers.findAll();
  if (_.isEmpty(schemes)) {
    res.status(404);
    throw new Error("No Schemes Found");
  }
  res.status(200).json(schemes);
} catch (error) {
  res.status(500);
  throw new Error("Internal Server Error");
}
});

/**
 * @returns SchemesForCustomers
 * @param MobileNumber
 */
const getSchemeByNumber = asyncHandler(async (req, res) => {
  try{ 
  const MobileNumber = req.params.MobileNumber ? req.params.MobileNumber : null;
  if (MobileNumber == null) {
    res.status(400);
    throw new Error("MobileNumber is Mandatory");
  }
  const condition = { MobileNumber: MobileNumber };
  const scheme = await SchemeForCustomers.findOne({ where: condition });
  if (scheme == null) {
    res.status(404);
    throw new Error("Scheme Not Found");
  }
  res.status(200).json(scheme);
} catch (error) {
  res.status(500);
  throw new Error("Internal Server Error");
}
});

module.exports = {
  addSchemes,
  getAllSchemes,
  getSchemeByNumber,
};
