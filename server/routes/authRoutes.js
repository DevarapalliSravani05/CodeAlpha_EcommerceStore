const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    res.json({
      message: "User Registered",
      user: {
        name,
        email,
        password: hashedPassword
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = jwt.sign(
      { email: req.body.email },
      "secretkey"
    );

    res.json({
      message: "Login Successful",
      token
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;