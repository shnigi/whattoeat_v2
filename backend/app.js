const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");
const yelpRouter = require("./routes/yelp");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", indexRouter);
app.use("/yelp", yelpRouter);
app.listen(3334);

module.exports = app;