const db = require("../models");
const asyncHandler = require("express-async-handler");
const Customer = db.customer;
const _ = require("lodash");

//Add Customer
const addCustomer = asyncHandler(async (req, res) => {
  try {
  const {
    CustomerName,
    Aadhar,
    Pan_Card,
    Email,
    Address,
    Phone,
    AlternatePhone,
  } = req.body;
  if (
    CustomerName === undefined || 
    CustomerName.trim() === "" ||
    Aadhar === undefined ||
    Aadhar.trim() === "" ||
    Pan_Card === undefined ||
    Pan_Card.trim() === "" ||
    Address === undefined ||
    Address.trim() === "" ||
    Phone === undefined ||
    Phone.trim() === "" ||
    AlternatePhone === undefined ||
    AlternatePhone.trim() === ""
  ) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const customerBean = {
    CustomerName: CustomerName,
    Aadhar: Aadhar,
    Pan_Card: Pan_Card,
    Email: Email,
    Address: Address,
    Phone: Phone,
    AlternatePhone: AlternatePhone,
  };

  const existingCustomer = await Customer.findOne({ where: customerBean });
  if (existingCustomer) {
    res.status(406);
    throw new Error("Customer Exists with Same Details");
  }
  const customer = await Customer.create(customerBean);
  res.status(200).json(customer);
} catch (error) {
  throw error;
}
});

const getCustomerByName = asyncHandler(async (req, res) => {
  try {
  const condition = req.params.customerName
    ? { CustomerName: req.params.customerName }
    : null;
  if (condition == null) {
    res.status(400);
    throw new Error("CustomerName is mandatory!");
  }
  const customer = await Customer.findOne({ where: condition });
  if (customer == null) {
    res.status(404);
    throw new Error("Entry Not Found for the given CustomerName...");
  }
  res.status(200).json(customer);
} catch (error) {
  throw error;
}
});

const getCustomerByPhone = asyncHandler(async (req, res) => {
  try {
  const phoneNumber = req.params.phone ? req.params.phone : null;
  if (phoneNumber == null) {
    res.status(400);
    throw new Error("PhoneNumber is mandatory!");
  }
  const customer = await getCustomerByPhoneNumber(phoneNumber, res);
  res.status(200).json(customer);
} catch (error) {
  throw error;
}
});


const getAll = asyncHandler(async (req, res) => {
  try {
  const customers = await Customer.findAll();
  if (_.isEmpty(customers)) {
    res.status(404);
    throw new Error("Customers Table Is Empty");
  }
  res.status(200).json(customers);
} catch (error) {
  throw error;
}
});

const updateCustomer = asyncHandler(async (req, res) => {
  try {
  const condition = req.params.CustomerID
    ? { CustomerID: req.params.CustomerID }
    : null;
  if (condition == null) {
    res.status(400);
    throw new Error("CustomerID is mandatory!");
  }
  const customer = await Customer.findOne({ where: condition });
  if (customer == null) {
    res.status(404);
    throw new Error("Entry Not Found for the given CustomerID...");
  }
  const [count, [updatedCustomer]] = await Customer.update(req.body, {
    where: condition,
    returning: true, // Set to true to return the updated record
  });

  if (count === 0) {
    res.status(500);
    throw new Error("Failed to update customer.");
  }
  res.status(200).json(updatedCustomer);
} catch (error) {
  throw error;
}
});

const deleteCustomer = asyncHandler(async (req, res) => {
  try {
  const condition = req.params.CustomerID
    ? { CustomerID: req.params.CustomerID }
    : null;
  if (condition == null) {
    res.status(400);
    throw new Error("CustomerID is mandatory!");
  }
  const customer = await Customer.findOne({ where: condition });
  if (customer == null) {
    res.status(404);
    throw new Error("Entry Not Found for the given CustomerName...");
  }
  await Customer.destroy({ where: condition });
  res.status(200).json({ message: "Deleted Successfully" });
} catch (error) {
  throw error;
}
});


const getCustomerBasedOnID = asyncHandler(async (req, res) => {
  try {
  const customerID = req.params.CustomerID
    ?req.params.CustomerID 
    : null;
  if (customerID == null) {
    res.status(400);
    throw new Error("CustomerID is mandatory!");
  }
const customer = await Customer.findByPk(customerID);
if (!customer) {
  return res.status(404).json({ message: "Customer not found for the given CustomerID" });
}
  res.status(200).json(customer);
} catch (error) {
  throw error;
}
});

async function getCustomerByPhoneNumber(phoneNumber, res) {
  try{
  const condition = { Phone: phoneNumber };
  const condition2 = { AlternatePhone: phoneNumber };

  const customer = (await Customer.findOne({ where: condition }))
    ? await Customer.findOne({ where: condition })
    : await Customer.findOne({ where: condition2 });
  if (customer == null) {
    res.status(404);
    throw new Error("Customer Entry Not found for the given number");
  }
  return customer;
} catch (error) {
  throw error;
}
}

async function getCustomerByCustomerID(customerID) {
  const condition = {CustomerID : customerID};
  const customer = await Customer.findOne({where : condition})
  if (customer == null) {
    res.status(404);
    throw new Error("Customer Entry Not found for the given number");
  }
  return customer;
}

module.exports = {
  addCustomer,
  getCustomerByPhone,
  getCustomerByName,
  deleteCustomer,
  updateCustomer,
  getAll,
  getCustomerByCustomerID,
  getCustomerBasedOnID,
  getCustomerByPhoneNumber
};
