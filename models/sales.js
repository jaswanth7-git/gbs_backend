module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define("sales", {
    SalesID: {
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
    Phone: {
      type: DataTypes.STRING(255),
    },
    Pan_Card: {
      type: DataTypes.STRING(255),
    },
    StateCode: {
      type: DataTypes.STRING(255),
    },
    BarCode: {
      type: DataTypes.STRING(255),
    },
    ItemName_Description: {
      type: DataTypes.STRING(255),
    },
    CategoryName: {
      type: DataTypes.STRING(255),
    },
    SubCategoryName: {
      type: DataTypes.STRING(255),
    },
    HSNCode: {
      type: DataTypes.STRING(255),
    },
    CaratType: {
      type: DataTypes.STRING(255),
    },
    HUID: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    TagName: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    GrWeight_Grams: {
      type: DataTypes.STRING(255),
    },
    NetWeight_Grams: {
      type: DataTypes.STRING(255),
    },
    Rate_Per_Gram: {
      type: DataTypes.STRING(255),
    },
    Making_Charge: {
      type: DataTypes.STRING(255),
    },
    Wastage_Charge: {
      type: DataTypes.STRING(255),
    },
    V_A: {
      type: DataTypes.STRING(255),
    },
    Stone_Type: {
      type: DataTypes.STRING(255),
    },
    Stone_Pieces_CTS: {
      type: DataTypes.STRING(255),
    },
    Stone_Pieces: {
      type: DataTypes.STRING(255),
    },
    Stones_RsPs: {
      type: DataTypes.STRING(255),
    },
    Discount_RsPs: {
      type: DataTypes.STRING(255),
    },
    Amount_RsPs: {
      type: DataTypes.STRING(255),
    },
    AdvanceAmount: {
      type: DataTypes.STRING(255),
    },
    SchemeAmount: {
      type: DataTypes.STRING(255),
    }
  });
  return Sales;
};
