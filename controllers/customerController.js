const db = require("../models");
const asyncHandler = require("express-async-handler");
const Customer = db.customer;
const _ = require("lodash");

//Add Customer
const addCustomer = asyncHandler(async (req, res) => {
  const { CustomerName, Aadhar, Pan_Card, Email, Address, Phone } = req.body;
  if (!CustomerName || !Aadhar || !Pan_Card || !Email || !Address || !Phone) {
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
  };

  const existingCustomer = await Customer.findOne({ where: customerBean });
  if (existingCustomer) {
    res.status(406);
    throw new Error("Customer Exists with Same Details");
  }
  const customer = await Customer.create(customerBean);
  res.status(200).json(customer);
});

const getCustomerByName = asyncHandler(async (req, res) => {
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
});

const updateCustomer = asyncHandler(async (req, res) => {
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
  const [count, [updatedCustomer]] = await Customer.update(req.body, {
    where: condition,
    returning: true, // Set to true to return the updated record
  });

  if (count === 0) {
    res.status(500);
    throw new Error("Failed to update customer.");
  }
  res.status(200).json(updatedCustomer);
});

const deleteCustomer = asyncHandler(async (req, res) => {
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
  await Customer.destroy({ where: condition });
  res.status(200).json({ message: "Deleted Successfully" });
});

const getAll = asyncHandler(async (req, res) => {
  const customers = await Customer.findAll();
  if (_.isEmpty(customers)) {
    res.status(404);
    throw new Error("Customers Table Is Empty");
  }
  res.status(200).json(customers);
});

module.exports = {
  addCustomer,
  getCustomerByName,
  deleteCustomer,
  updateCustomer,
  getAll
};
