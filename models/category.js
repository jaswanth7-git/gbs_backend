module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
      CategoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CategoryName: {
        type: DataTypes.STRING(255),
      },
      Quantity: {
        type: DataTypes.INTEGER,
      },
      Branch: {
        type: DataTypes.TEXT,
      },
      ActiveStatus: {
        type: DataTypes.INTEGER,
      }
    });
    return Category;
  };
  