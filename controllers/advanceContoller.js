const db = require("../models");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const {
  getCustomerByCustomerID,
  getCustomerByPhoneNumber,
} = require("./customerController");
const Advance = db.advance;

// POST
const addAdvanceAmount = asyncHandler(async (req, res) => {
  try {
    const phoneNumber = req.params.phone ? req.params.phone : null;
    if (phoneNumber == null) {
      res.status(400);
      throw new Error("PhoneNumber is mandatory!");
    }
    const { Amount, AdvanceDesc } = req.body;
    if (
      Amount === undefined ||
      Amount.trim() === "" ||
      AdvanceDesc === undefined ||
      AdvanceDesc.trim() == ""
    ) {
      res.status(400);
      throw new Error("Amount is mandatory, Check the request Body");
    }

    const formattedDate = prepareCurrentDate();
    const customer = await getCustomerByPhoneNumber(phoneNumber, res);

    const advanceBean = {
      Amount: Amount,
      AdvanceDesc: AdvanceDesc,
      Date: formattedDate,
      CustomerID: customer.CustomerID,
      CustomerName: customer.CustomerName,
    };

    const savedAdvance = await Advance.create(advanceBean);

    res.status(201).json(savedAdvance);
  } catch (error) {
    throw error;
  }
});

function prepareCurrentDate() {
  const currentDate = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  return formattedDate;
}

// GET
const getAdvanceAmountByCustomerNumber = asyncHandler(async (req, res) => {
  try {
    const phoneNumber = req.params.phone ? req.params.phone : null;
    if (phoneNumber == null) {
      res.status(400);
      throw new Error("PhoneNumber is mandatory!");
    }
    const customer = await getCustomerByPhoneNumber(phoneNumber, res);
    const combinedData = await getAdvancesOfCustomer(customer, res);
    res.status(200).json(combinedData);
  } catch (error) {
    throw error;
  }
});

// GET
const getAllAdvanceAmounts = asyncHandler(async (req, res) => {
  try {
    const advancesOfCustomers = await Advance.findAll();
    if (_.isEmpty(advancesOfCustomers)) {
      res.status(404);
      throw new Error("No Customer Hasn't paid any advances Till Date");
    }
    const resultArray = await getResultSet(advancesOfCustomers, res);
    res.status(200).json(advancesOfCustomers);
  } catch (error) {
    throw error;
  }
});

// GET Total Advance Amount for a CustomerID
const getTotalAdvanceAmountByCustomerId = asyncHandler(async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      res.status(400);
      throw new Error("CustomerID is mandatory!");
    }

    const totalAmountResult = await Advance.findAll({
      attributes: [
        [db.sequelize.fn("SUM", db.sequelize.cast(db.sequelize.col("Amount"), "DECIMAL")), "totalAmount"],
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

// PUT
const updateAdvanceAmount = asyncHandler(async (req, res) => {
  try {
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

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    throw error;
  }
});


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

// POST Add Advance Amount by CustomerID
const addAdvanceAmountByCustomerId = asyncHandler(async (req, res) => {
  try {
    const { customerId } = req.params;
    const { Amount, AdvanceDesc } = req.body;

    if (!customerId) {
      res.status(400);
      throw new Error("CustomerID is mandatory!");
    }

    if (
      Amount === undefined ||
      Amount.trim() === "" ||
      AdvanceDesc === undefined ||
      AdvanceDesc.trim() === ""
    ) {
      res.status(400);
      throw new Error("Amount and AdvanceDesc are mandatory, Check the request Body");
    }

    const customer = await getCustomerByCustomerID(customerId);
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found!");
    }

    const formattedDate = prepareCurrentDate();

    const advanceBean = {
      Amount,
      AdvanceDesc,
      Date: formattedDate,
      CustomerID: customer.CustomerID,
      CustomerName: customer.CustomerName,
    };

    const savedAdvance = await Advance.create(advanceBean);

    res.status(201).json(savedAdvance);
  } catch (error) {
    throw error;
  }
});


async function getAdvancesOfCustomer(customer, res) {
  const condition = { CustomerID: customer.CustomerID };
  const existingAdvanceData = await Advance.findAll({ where: condition });
  if (_.isEmpty(existingAdvanceData)) {
    res.status(404);
    throw new Error("Customer Hasn't paid any advances Till Date");
  }
  return existingAdvanceData;
}

module.exports = {
  addAdvanceAmount,
  getAdvanceAmountByCustomerNumber,
  getAllAdvanceAmounts,
  getTotalAdvanceAmountByCustomerId, // Added the new endpoint
  updateAdvanceAmount,
  addAdvanceAmountByCustomerId
};
