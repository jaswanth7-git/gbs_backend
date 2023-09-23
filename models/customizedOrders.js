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
      ItemName: {
        type: DataTypes.STRING(255),
      },
      ModelNumber: {
        type: DataTypes.STRING(255),
      },
    });
    return CustomizedOrders;
  };
  