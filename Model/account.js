const { DataTypes } = require("sequelize");
const sequelize = require("../util/sequelize");

const account = sequelize.define("account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: DataTypes.STRING,
  date: DataTypes.DATE,
  time: DataTypes.TIME,
  note: DataTypes.TEXT,
  isIncome: DataTypes.BOOLEAN,
  category: DataTypes.JSON,
});

module.exports = account;
