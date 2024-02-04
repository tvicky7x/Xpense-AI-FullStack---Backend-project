const express = require("express");
const bcrypt = require("bcrypt");
const user = require("../Model/user");
const jwt = require("jsonwebtoken");
const category = require("../Model/category");
const account = require("../Model/account");

const router = express();

router.post("/sign-up", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    let password = req.body.password;
    password = await bcrypt.hash(password, 10);
    const User = await user.create({ name, email, password });
    res.json({ massage: "User signed up successfully." });
    await Promise.all(
      req.body.categories.map(async (data) => {
        await User.createCategory(data);
      })
    );
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.json({ error: "Email address already in use." });
    }
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    let User = await user.findOne({ where: { email: req.body.email } });
    if (User) {
      const { id, email, password } = User.toJSON();
      const result = await bcrypt.compare(req.body.password, password);
      if (result) {
        const token = jwt.sign({ id, email }, process.env.JWT_SECRET);
        res.json({
          token,
        });
      } else {
        res.json({ error: "Incorrect password." });
      }
    } else {
      res.json({ error: "User does not exist." });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const result = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (result) {
      const findUser = await user.findByPk(result.id);
      if (findUser) {
        const userData = findUser.toJSON();
        const findAccounts = await account.findAll({
          where: { userId: userData.id },
        });
        const accountsArray = findAccounts.map((item) => item.toJSON());
        const expenseCategoriesAll = await category.findAll({
          where: { userId: userData.id, isIncome: null },
        });
        const expenseCategories = expenseCategoriesAll.map((item) =>
          item.toJSON()
        );
        const incomeCategoriesAll = await category.findAll({
          where: { userId: userData.id, isIncome: true },
        });
        const incomeCategories = incomeCategoriesAll.map((item) =>
          item.toJSON()
        );
        res.json({
          accountsArray,
          expenseCategories,
          incomeCategories,
          massage: "Welcome! You have successfully logged in.",
        });
      } else {
        res.json({ error: "Incorrect Token" });
      }
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.json({ error: "Incorrect Token" });
    }
  }
});

module.exports = router;
