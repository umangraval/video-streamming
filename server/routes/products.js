const express = require("express");
const fs = require("fs");
const { Product } = require("../model/Product");
const { Media } = require("../model/Media");
const notLoggedInValidator = require("../validation/notLoggedInValidator");

const app = express();

app.post("/", notLoggedInValidator, async function(req, res) {
  try {
    const { name, slug } = req.body;
    const product = await Product.findOne({slug});
    if (product) return res.status(400).json({ error: "Slug already exist" });
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.slug = slug;
    const data = await newProduct.save();
    res.json(data);
  } catch (e) {
    console.log("Error", e);
  }
});

// endpoint to fetch all products metadata
app.get("/products", async function(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (e) {
    console.log("Error", e);
  }
});

app.get("/qrcode/:id", async function(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      $inc: {
        hits: 1
      }
    });
    res.json(product);
  } catch (e) {
    console.log("Error", e);
  }
});

app.delete("/delete/:id", notLoggedInValidator, async function(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    const media = await Media.find({ productId: product._id });
    media.forEach(e => {
      const path = process.env.STORAGE + `/${e.filename}`;
      fs.unlink(path, err => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
      });
    });
    await Product.findByIdAndDelete(id);
    await Media.deleteMany({ productId: product._id });
    res.json("deleted");
  } catch (e) {
    console.log("Error", e);
  }
});

module.exports = app;
