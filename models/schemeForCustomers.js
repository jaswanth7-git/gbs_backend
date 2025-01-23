module.exports = (sequelize, DataTypes) => {
  const SchemeForCustomers = sequelize.define("schemeForCustomers", {
    SchemeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CustomerID: {
      type: DataTypes.INTEGER,
    },
    SchemeName: {
      type: DataTypes.STRING(255),
    },
    SchemeAmount: {
      type: DataTypes.STRING(255),
    },
    SchemeDesc: {
      type: DataTypes.STRING(255),
    },
    CustomerName: {
      type: DataTypes.STRING(255),
    },
    MobileNumber: {
      type: DataTypes.STRING(255),
    },
  });
  return SchemeForCustomers;
};
