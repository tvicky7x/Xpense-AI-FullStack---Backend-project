const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const sequelize = require("./util/sequelize");
const authRouter = require("./Controller/auth");
const tokenCheck = require("./Controller/tokenCheck");
const accountRouter = require("./Controller/account");
const user = require("./Model/user");
const account = require("./Model/account");
const category = require("./Model/category");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(authRouter);
app.use(tokenCheck);
app.use(accountRouter);

// association
user.hasMany(account);
account.belongsTo(user);

user.hasMany(category);
category.belongsTo(user);

// port and sync
const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
