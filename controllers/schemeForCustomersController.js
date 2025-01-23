const db = require("../models");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const { getCustomerByPhoneNumber , getCustomerByCustomerID} = require("./customerController");
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
  throw error;
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
  throw error;
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
  throw error;
}
});

/**
 * @returns Total Scheme Amount for a CustomerID
 * @param CustomerID
 */
const getTotalSchemeAmountByCustomerId = asyncHandler(async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      res.status(400);
      throw new Error("CustomerID is mandatory!");
    }

    const totalAmountResult = await SchemeForCustomers.findAll({
      attributes: [
        [db.sequelize.fn("SUM", db.sequelize.cast(db.sequelize.col("SchemeAmount"), "DECIMAL")), "totalAmount"],
      ],
      where: {
        CustomerID: customerId,
      },
    });

    const totalAmount = totalAmountResult[0]?.get("totalAmount") || 0;

    res.status(200).json({
      customerId,
      totalAmount,
    });
  } catch (error) {
    throw error;
  }
});

const addSchemesByCustomerId = asyncHandler(async (req, res) => {
  try {
    const { customerId } = req.params;
    const { SchemeName, SchemeAmount, SchemeDesc } = req.body;

    if (!customerId) {
      res.status(400).json({ error: "CustomerID is mandatory!" });
      return; // Stop further execution
    }

    if (
      !SchemeName ||
      SchemeName.trim() === "" ||
      !SchemeAmount ||
      SchemeAmount.trim() === "" ||
      !SchemeDesc ||
      SchemeDesc.trim() === ""
    ) {
      res.status(400).json({ error: "SchemeName, SchemeAmount, and SchemeDesc are mandatory, check the request body." });
      return; // Stop further execution
    }

    const customer = await getCustomerByCustomerID(customerId, res);
    if (!customer) {
      res.status(404).json({ error: "Customer not found!" });
      return; // Stop further execution
    }

    const schemeBean = {
      SchemeName,
      SchemeAmount,
      SchemeDesc,
      CustomerID: customerId,
      CustomerName: customer.CustomerName,
      MobileNumber: customer.MobileNumber,
    };

    const schemeForCustomers = await SchemeForCustomers.create(schemeBean);

    if (!schemeForCustomers) {
      res.status(500).json({ error: "Failed to add scheme." });
      return; // Stop further execution
    }

    res.status(201).json(schemeForCustomers);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});


module.exports = {
  addSchemes,
  getAllSchemes,
  getSchemeByNumber,
  getTotalSchemeAmountByCustomerId,
  addSchemesByCustomerId
};
