const express = require("express");
const userRoutes = require('./user.routes')

const routes = express();

routes.use("/", userRoutes);

module.exports = routes;
