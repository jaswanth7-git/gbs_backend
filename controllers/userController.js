const db = require("../models");
const User = db.user;
const _ = require("lodash");
const asyncHandler = require("express-async-handler");

//POST Method
const addUser = asyncHandler(async (req, res) => {
  const { userName, password, Branch, Role } = req.body;
  if (!userName || !password || !Branch || !Role) {
    res.status(400);
    next(new Error("All fields are mandatory!"));
  }

  const userBean = {
    userName: userName,
    password: password,
    Branch: Branch,
    Role: Role,
  };
  const exists = await User.findOne({ where: { userName: userName } });
  if (exists !== null) {
    res.status(400);
    throw new Error("Entry Exists With Same Data Try Changing UserName");
  }

  const user = await User.create(userBean);
  res.status(201).json(user);
});

//GET all Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  if (_.isEmpty(users)) {
    res.status(404).json({ message: "No Entries found." });
  }
  res.status(200).json(users);
});

//GET Users By Branch
const getUserByBranch = asyncHandler(async (req, res) => {
  const branch = req.params.branch;
  const condition = branch ? { Branch: branch } : null;
  if (condition === null) {
    res.status(400);
    next(new Error("BranchName cannot be null"));
  }
  const users = await User.findAll({ where: condition });
  if (_.isEmpty(users)) {
    res.status(404);
    throw new Error("No Entries Found For The Given Branch.");
  }
  res.status(200).json(users);
});

module.exports = { addUser, getAllUsers, getUserByBranch };
