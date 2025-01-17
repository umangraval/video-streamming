const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const setUser = require("./utils/setUser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

var corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.0.103:3000', 'http://192.168.1.244:3000', 'http://local.rsdecor.in'],
  credentials: true };

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// ==========================================================

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

// When the connection is disconnected:
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection Disconnected");
});

app.use(
  session({
    // name: process.env.SESS_NAME,
    secret: '123op',
    // saveUninitialized: false,
    // resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);

// ==========================================================
app.get("/test", function(req, res) {
  res.send("working");
});

app.use("/auth", routes.authRoutes);
app.use(setUser);
app.get('/current', (req, res) => res.json(req.user));
app.use("/media", routes.mediaRoutes);
app.use("/product", routes.productRoutes);
app.use("/category", routes.categoryRoutes);

// app.use(notLoggedInValidator);


app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
