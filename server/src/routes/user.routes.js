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
  
  //get all users -- para que desde admin se pueda ver los usuarios
  router.get("/allUsers", (req, res) => {
    const user = userSchema;
    user
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
  
  //update a user -- para que el usuario pueda cambiar algun dato personal?
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { email, password, } = req.body;
    userSchema
      .updateOne({ _id: id }, { $set: { email, password } })
      .then((result) => {
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario actualizado correctamente" });
      })
      .catch((error) => res.status(500).json({ error: "Error al actualizar al usuario" }));
  });
  
  //delete user by id
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    userSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
  
  
  module.exports = router;