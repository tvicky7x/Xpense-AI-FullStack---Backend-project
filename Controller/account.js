const express = require("express");
const category = require("../Model/category");
const account = require("../Model/account");

const router = express();

router.post("/add-account", async (req, res) => {
  const user = req.user;
  const result = await user.createAccount(req.body);
  if (result) {
    res.json({ massage: "Record Added to Database." });
  }
});
router.delete("/delete-account", async (req, res) => {
  const user = req.user.toJSON();
  const result = await account.destroy({
    where: { id: req.body.id, userId: user.id },
  });
  if (result) {
    res.json({ massage: "Record Deleted from Database." });
  }
});
router.patch("/update-account", async (req, res) => {
  const user = req.user.toJSON();
  const result = await account.update(req.body, {
    where: { id: req.body.id, userId: user.id },
  });
  if (result) {
    res.json({ massage: "Record Updated in Database." });
  }
});

router.get("/categories/:categoriesId", async (req, res) => {
  const categoryId = req.params.categoriesId;
  const user = req.user.toJSON();
  const findCategory = await category.findByPk(categoryId);
  const currentCategory = findCategory.toJSON();
  const findAccount = await account.findAll({
    where: {
      userId: user.id,
    },
  });
  const currentAccounts = findAccount
    .map((item) => item.toJSON())
    .filter((item) => item.category.id === currentCategory.id);
  res.json({ currentCategory, currentAccounts });
});

module.exports = router;
