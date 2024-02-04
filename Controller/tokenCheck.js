const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../Model/user");

const router = express();

router.use(async (req, res, next) => {
  try {
    const userToken = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const userDate = await user.findByPk(userToken.id);

    if (userDate) {
      req.user = userDate;
      next();
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
