const { DataTypes } = require("sequelize");
const sequelize = require("../util/sequelize");

const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  isPremium: DataTypes.BOOLEAN,
});

module.exports = user;
