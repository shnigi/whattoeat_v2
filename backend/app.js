const express = require("express");
const cors = require("cors");
const yelpRouter = require("./routes/yelp");
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use('/api', yelpRouter);
app.listen(3334);

module.exports = app;