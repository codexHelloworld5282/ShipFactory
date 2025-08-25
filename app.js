const express = require("express");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/courier", orderRoutes);

module.exports = app;
