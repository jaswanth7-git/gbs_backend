module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define("sales", {
      SalesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      StateCode : {
        type: DataTypes.STRING(255),
      },
    });
    return Sales;
  };
  