const db = require("../models");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const { getCustomerBasedOnPhone } = require("./customerController");
const Advance = db.advance;

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

const getAdvanceAmountByCustomerNumber = asyncHandler(async(req,res)=>{
    const customer = await getCustomerBasedOnPhone(req, res);
    const condition = { CustomerID: customer.CustomerID };
    const existingAdvanceData = await Advance.findAll({where : condition});
    if(_.isEmpty(existingAdvanceData)){
        res.status(404);
        throw new Error("Customer Hasn't paid any advances Till Date");
    }
    const combinedData = {...customer, advances : existingAdvanceData };
    res.status(200).json(combinedData)
});

module.exports = {
    addAdvanceAmount,
    getAdvanceAmountByCustomerNumber
}