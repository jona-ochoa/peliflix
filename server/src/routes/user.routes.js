const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_PRIVATE_KEY;

const userSchema = require("../models/schema/userSchema");

const router = express.Router();

router.post("/login", (req, res) => {
    const user = userSchema(req.body);
    user
      .save()
      .then((data) => {
        const token = jwt.sign({ userId: data._id }, secretKey, { expiresIn: "1h" });
        res.json({token, user:data})
      })
      .catch((error) => res.json({ message: error }));
  });

  router.post("/register", (req, res) => {
    const newUser = new userSchema(req.body);
    newUser
      .save()
      .then((data) => {
        res.json({ success: true, message: "Usuario registrado exitosamente", user: data });
      })
      .catch((error) => {
        res.json({ success: false, message: "Error al registrar el usuario", error: error });
      });
  }); 
  
  module.exports = router;