import express, { Request, Response } from "express";
const cors = require('cors');
const yelpRouter = require('./routes/yelp');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', yelpRouter);
app.get('/test', (req: Request, res: Response) => {
  res.send('Server is up and running');
});
const port = Number(process.env.PORT) || 3334;
app.listen(port);

module.exports = app;
