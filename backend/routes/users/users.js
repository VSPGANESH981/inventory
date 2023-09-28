const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../../Models/User");
const { StatusCodes } = require("http-status-codes");
const { body, validationResult } = require("express-validator");
const { JWT_EXPIRY_SECONDS, JWT_TOKEN_NAME } = require("../../Constants/constants");


router.post(
  "/signup",
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: errors.array() });
      }

      const existingUser = await User.findOne({
        username: req.body.username,
      });
      if (existingUser) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Username already taken" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      await newUser.save();
      res
        .status(StatusCodes.CREATED)
        .json({ message: "User created successfully" });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }
);

router.post(
  "/login",
  body("username")
  .isLength({ min: 3 })
  .withMessage("Username must be at least 3 characters long."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: errors.array() });
      }

      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid user" });
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        {username: user.username },
        process.env.JWT_SECRET, 
        {
          expiresIn: "1y",
        }
      );

      res.cookie(JWT_TOKEN_NAME, token, {
        maxAge: JWT_EXPIRY_SECONDS * 1000,
        sameSite: "strict",
      });
      res.status(StatusCodes.OK).json({ message: "Login successful" });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie(JWT_TOKEN_NAME, {
    maxAge: JWT_EXPIRY_SECONDS * 1000,
    sameSite: "strict",
  });
  res.status(StatusCodes.OK).json({ message: "Logout successful" });
});

router.get("/getCurrentUser", async (req, res) => {
  try {
    const token = req.cookies[JWT_TOKEN_NAME];
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message : "user not logged"});
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decodedToken.username });
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message : "invalid user"});
    }
    res.status(StatusCodes.OK).json({user : {username : user.username} });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});

module.exports = router;
