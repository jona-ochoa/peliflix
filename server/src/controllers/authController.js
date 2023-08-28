const express = require("express");
const jwt = require("jsonwebtoken");
const errorHandler = require("../handlers/errorHandler")
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.JWT_PRIVATE_KEY;

const userSchema = require("../models/schema/userSchema");

const login = async (req, res) => {
  try {
    const user = userSchema(req.body);
    const data = await user.save();

    const token = jwt.sign({ userId: data._id }, secretKey, { expiresIn: "1h" });
    res.json({ token, user: data });
  } catch (error) {
    errorHandler.handleServerError(res, error);
  }
};

module.exports = { login };