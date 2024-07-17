const express = require("express");
require("./config/db");
const GlobalErrorHandler = require("./controllers/ErrorHandler.js");
const configureRoute = require("./routeConfig.js");

const app = express();

// extracted routes
configureRoute(app);

// global middleware
app.use(GlobalErrorHandler);

module.exports = app;
