module.exports = (sequelize,DataTypes) => {

    const Product = sequelize.define("product",
        {
            ProductID: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            ItemName_Description: {
              type: DataTypes.STRING,
            },
            HSNCode: {
              type: DataTypes.STRING(10),
              unique: true,
            },
            GrWeight_Grams: {
              type: DataTypes.DECIMAL(10, 4),
            },
            NetWeight_Grams: {
              type: DataTypes.DECIMAL(10, 4),
            },
            Rate_Per_Gram: {
              type: DataTypes.DECIMAL(10, 4),
            },
            ValAdd_RsPs: {
              type: DataTypes.DECIMAL(10, 4),
            },
            Stones_RsPs: {
              type: DataTypes.DECIMAL(10, 4),
            },
            Discount_RsPs: {
              type: DataTypes.DECIMAL(10, 4),
            },
            Amount_RsPs: {
              type: DataTypes.DECIMAL(10, 4),
            },
            BarCode_path: {
                type: DataTypes.TEXT,
            },
            BarCode: {
              type: DataTypes.TEXT,
          },
            Branch: {
                type: DataTypes.TEXT,
            },
            ActiveStatus: {
              type: DataTypes.INTEGER,
            }
    });

    return Product;
}