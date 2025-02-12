const db = require("../models");
const User = db.user;
const _ = require("lodash");
const asyncHandler = require("express-async-handler");

//POST Method
const addUser = asyncHandler(async (req, res) => {
  try {
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
  if (exists != null) {
    res.status(400);
    throw new Error("Entry Exists With Same Data Try Changing UserName");
  }

  const user = await User.create(userBean);
  res.status(201).json(user);
} catch (error) {
  throw error;
}
});

//GET Users By Branch
const getUserByBranch = asyncHandler(async (req, res,next) => {
  try {
  const branch = req.params.branch ? req.params.branch : null;
  if(branch==null){
    res.status(400);
    throw new Error("BranchName cannot be null");
  }
  const {userName,password} = req.body;
  const condition = password && userName ? { userName: userName,password: password,Branch: branch } : null;
  if (condition === null) {
    res.status(400);
    next(new Error("userName,password cannot be null"));
  }
  const user = await User.findOne({ where: condition });
  if (user==null) {
    res.status(404);
    throw new Error("No Entries Found For The Given Branch.");
  }
  res.status(200).json({status : "SUCCESS", userName: userName, role : user.Role ,branch : branch});
} catch (error) {
  throw error;
}
});

module.exports = { addUser, getUserByBranch };
