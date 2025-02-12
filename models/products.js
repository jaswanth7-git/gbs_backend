module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ItemName_Description: {
      type: DataTypes.STRING,
    },
    HSNCode: {
      type: DataTypes.STRING(255),
    },
    HUID: {
      type: DataTypes.STRING(255),
    },
    TagName: {
      type: DataTypes.STRING(255),
    },
    BarCode_Prefix: {
      type: DataTypes.STRING(255),
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
    Making_Direct: {
      type: DataTypes.STRING(255),
    },
    Wastage_Charge: {
      type: DataTypes.STRING(255),
    },
    Wastage_Direct: {
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
    BarCode: {
      type: DataTypes.STRING(255),
      unique: true, // Enforce uniqueness
    },
    Branch: {
      type: DataTypes.TEXT,
    },
    ActiveStatus: {
      type: DataTypes.INTEGER,
    },
  });

  return Product;
};
