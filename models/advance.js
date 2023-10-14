module.exports = (sequelize, DataTypes) => {
  const Advance = sequelize.define("advance", {
    AdvanceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Amount: {
      type: DataTypes.STRING(255),
    },
    Date: {
      type: DataTypes.STRING(255),
    },
    CustomerName: {
      type: DataTypes.STRING(255),
    },
  });
  return Advance;
};
