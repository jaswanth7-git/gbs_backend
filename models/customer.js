module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("customer", {
    CustomerID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CustomerName: {
      type: DataTypes.STRING(255),
    },
    Aadhar: {
      type: DataTypes.STRING(255),
    },
    Pan_Card: {
      type: DataTypes.STRING(255),
    },
    Email: {
      type: DataTypes.STRING(255),
    },
    Address: {
      type: DataTypes.STRING(255),
    },
    Phone: {
      type: DataTypes.STRING(255),
    },
    AlternatePhone: {
      type: DataTypes.STRING(255),
    },
  });
  return Customer;
};
