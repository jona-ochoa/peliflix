const express = require("express");
const userRoutes = require('./user.routes')

const routes = express();

routes.use("/user", userRoutes);

module.exports = routes;
