module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    Branch: {
      type: DataTypes.STRING(255),
    },
    Role: {
      type: DataTypes.STRING(255),
    },
  });
  return User;
};
