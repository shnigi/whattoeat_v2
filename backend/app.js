"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const yelpRouter = require('./routes/yelp');
const app = (0, express_1.default)();
const path = require('path');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors());
app.use(express_1.default.static(path.join(__dirname, '../frontend/build')));
app.use('/api', yelpRouter);
app.get('/test', (req, res) => {
    res.send('Server is up and running');
});
app.listen(3334);
module.exports = app;
