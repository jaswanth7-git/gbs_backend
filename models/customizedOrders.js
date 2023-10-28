module.exports = (sequelize, DataTypes) => {
    const CustomizedOrders = sequelize.define("customizedOrders", {
      CustomizedOrderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      DeliveryDate: {
        type: DataTypes.STRING(255),
      },
      OrderedDate: {
        type: DataTypes.STRING(255),
      },
      ItemName: {
        type: DataTypes.STRING(255),
      },
      Weight: {
        type: DataTypes.STRING(255),
      },
      Making_Charge: {
        type: DataTypes.STRING(255),
      },
      Wastage: {
        type: DataTypes.STRING(255),
      },
      Gram_Rate: {
        type: DataTypes.STRING(255),
      },
      Advance_Amount: {
        type: DataTypes.STRING(255),
      },
      ModelNumber: {
        type: DataTypes.STRING(255),
      },
    });
    return CustomizedOrders;
  };
  