const userSchema = require("../models/schema/userSchema");
const errorHandler = require("../handlers/errorHandler.js")

const register = async (req, res) => {
  try {
    const newUser = new userSchema(req.body);
    const data = await newUser.save();
    
    res.status(201).json({ success: true, message: "Usuario registrado exitosamente", user: data });
  } catch (error) {
    errorHandler.handleServerError(res, error);
  }
};

module.exports = { register };