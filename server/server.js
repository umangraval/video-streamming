const express = require('express');
const cors  = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// var corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// ==========================================================

// Database Connection
mongoose.connect("mongodb://localhost/mydb", {useNewUrlParser: true});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected');
});

// When the connection is disconnected:
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

app.use(
  session({
      name: process.env.SESS_NAME,
      secret: process.env.SESS_SECRET,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);


// ==========================================================
app.get('/test', function(req, res) {
  res.send('working');
});

app.use('/media', routes.mediaRoutes);
app.use('/product', routes.productRoutes);
app.use('/category', routes.categoryRoutes);

app.listen(port, function () {
  console.log(`Listening on port ${port}!`)
});