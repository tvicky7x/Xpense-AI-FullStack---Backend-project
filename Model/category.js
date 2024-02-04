const { DataTypes } = require("sequelize");
const sequelize = require("../util/sequelize");

const category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  icon: DataTypes.STRING,
  isIncome: DataTypes.BOOLEAN,
});

module.exports = category;
