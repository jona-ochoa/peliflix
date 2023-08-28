const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_PRIVATE_KEY;

const userSchema = require("../models/schema/userSchema");

const router = express.Router();

router.post("/login", async(req, res) => {
    try {
      const { email, password } = req.body;
  
      // Verificar si el usuario existe en la base de datos
      const user = await userSchema.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Usuario no registrado" });
      }
  
      // Verificar las credenciales
      if (user.password !== password || user.email !== email) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
  
      // Generar el token JWT
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
  
      res.status(200).json({ token, user: user });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  }); 

  router.post("/register", async(req, res) => {
    try {
      const { email } = req.body;
  
      // Verificar si el correo electrónico ya está registrado
      const existingUser = await userSchema.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "El usuario ya está registrado con este correo electrónico" });
      }
  
      // Si el correo electrónico no está registrado, guardar el nuevo usuario
      const newUser = new userSchema(req.body);
      const savedUser = await newUser.save();
  
      res.status(201).json({ success: true, message: "Usuario registrado exitosamente", user: savedUser });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error al registrar el usuario", error: error });
    }
  }); 
  
  module.exports = router;