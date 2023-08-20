module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define("sales", {
      SalesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CustomerName : {
        type: DataTypes.STRING(255),
      },
      Phone : {
        type: DataTypes.STRING(255),
      },
      Pan_Card : {
        type: DataTypes.STRING(255),
      },
      StateCode : {
        type: DataTypes.STRING(255),
      },
      BarCode: {
        type: DataTypes.STRING(255),
      },
    ItemName_Description: {
      type: DataTypes.STRING(255),
    },
    CategoryName:{
      type: DataTypes.STRING(255),
    },
    HSNCode: {
      type: DataTypes.STRING(255),
    },
    GrWeight_Grams: {
      type: DataTypes.STRING(255),
    },
    NetWeight_Grams:{
      type: DataTypes.STRING(255),
    },
    Rate_Per_Gram:{
      type: DataTypes.STRING(255),
    },
    ValAdd_RsPs: {
      type: DataTypes.STRING(255),
    },
    Stones_RsPs:{
      type: DataTypes.STRING(255),
    },
    Discount_RsPs:{
      type: DataTypes.STRING(255),
    },
    Amount_RsPs: {
      type: DataTypes.STRING(255),
    },
    });
    return Sales;
  };
