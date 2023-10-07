const db = require("../models");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const {
  getCustomerBasedOnPhone,
  getCustomerByCustomerID,
} = require("./customerController");
const Advance = db.advance;

//POST
const addAdvanceAmount = asyncHandler(async (req, res) => {
  const { Amount } = req.body;
  if (Amount === undefined || Amount.trim() === "") {
    res.status(400);
    throw new Error("Amount is mandatory, Check the request Body");
  }
  const formattedDate = prepareCurrentDate();
  const customer = await getCustomerBasedOnPhone(req, res);
  const advanceBean = {
    Amount: Amount,
    Date: formattedDate,
    CustomerID: customer.CustomerID,
  };

  const savedAdvance = await Advance.create(advanceBean);
  res.status(201).json(savedAdvance);
});

function prepareCurrentDate() {
  const currentDate = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  return formattedDate;
}

//GET
const getAdvanceAmountByCustomerNumber = asyncHandler(async (req, res) => {
  const customer = await getCustomerBasedOnPhone(req, res);
  const combinedData = await getAdvancesOfCustomer(customer, res);
  res.status(200).json(combinedData);
});

//GET
const getAllAdvanceAmounts = asyncHandler(async (req, res) => {
  const advancesOfCustomers = await Advance.findAll();
  if (_.isEmpty(advancesOfCustomers)) {
    res.status(404);
    throw new Error("No Customer Hasn't paid any advances Till Date");
  }
  const resultArray = await getResultSet(advancesOfCustomers, res);
  res.status(200).json(advancesOfCustomers);
});

//PUT
const updateAdvanceAmount = asyncHandler(async (req, res) => {
  for (const advID in req.body) {
    const amount = requestBody[advID];
    const advance = await Advance.findByPk(existingAdvanceID);
    if (!advance) {
      res.status(404);
      throw new Error("Advance not found");
    }

    const updatedAmount =
      parseInt(advance.Amount) - amount < 0
        ? 0
        : parseInt(advance.Amount) - amount;
    const cond = { AdvanceID: advID };
    const [count, [updatedAdvanceEntry]] = await Advance.update(
      { Amount: updatedAmount },
      {
        where: cond,
        returning: true, // Set to true to return the updated record
      }
    );

    if (count === 0) {
      res.status(500);
      throw new Error("Failed to update customer.");
    }
  }

  res.status(200).json({message : "Updated Successfully"})
});

module.exports = {
  addAdvanceAmount,
  getAdvanceAmountByCustomerNumber,
  getAllAdvanceAmounts,
  updateAdvanceAmount
};

async function getResultSet(advancesOfCustomers, res) {
  const uniqueCustomerIDs = new Set();
  advancesOfCustomers.forEach((advance) => {
    uniqueCustomerIDs.add(advance.CustomerID);
  });
  const uniqueCustomerIDArray = [...uniqueCustomerIDs];
  const resultArray = [];
  uniqueCustomerIDArray.forEach(async (customerID) => {
    const customerBean = await getCustomerByCustomerID(customerID);
    const advanceInfo = getAdvancesOfCustomer(customerBean, res);
    resultArray.push(advanceInfo);
  });
  return resultArray;
}

async function getAdvancesOfCustomer(customer, res) {
  const condition = { CustomerID: customer.CustomerID };
  const existingAdvanceData = await Advance.findAll({ where: condition });
  if (_.isEmpty(existingAdvanceData)) {
    res.status(404);
    throw new Error("Customer Hasn't paid any advances Till Date");
  }
  return existingAdvanceData;
}
