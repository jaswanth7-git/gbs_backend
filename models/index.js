const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectModule : require("pg"),
  operatorsAliases: false,
  benchmark : true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("../models/products.js")(sequelize, DataTypes);
db.category = require("../models/category.js")(sequelize, DataTypes);
db.user = require("../models/user.js")(sequelize, DataTypes);
db.customer = require("../models/customer.js")(sequelize, DataTypes);
db.sales = require("../models/sales.js")(sequelize, DataTypes);
db.advance = require("../models/advance.js")(sequelize, DataTypes);
db.customizedOrders = require("../models/customizedOrders.js")(
  sequelize,
  DataTypes
);
db.schemeForCustomers = require("../models/schemeForCustomers.js")(
  sequelize,
  DataTypes
);

db.category.hasMany(db.products, {
  foreignKey: "CategoryID",
  as: "products",
});

db.products.belongsTo(db.category, {
  foreignKey: "CategoryID",
  as: "category",
});

db.customer.hasMany(db.advance, {
  foreignKey: "CustomerID",
  as: "advance",
});

db.advance.belongsTo(db.customer, {
  foreignKey: "CustomerID",
  as: "customer",
});

db.customer.hasMany(db.schemeForCustomers, {
  foreignKey: "CustomerID",
  as: "scheme",
});

db.schemeForCustomers.belongsTo(db.customer, {
  foreignKey: "CustomerID",
  as: "customerScheme",
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;