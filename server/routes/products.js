const express = require('express');
const fs = require('fs');
const { Product } = require('../model/Product');
const { Video } = require('../model/Video');
const notLoggedInValidator = require('../validation/notLoggedInValidator');

const app = express();

app.post('/', notLoggedInValidator, async function(req, res) {
    const { name } = req.body;
    const newProduct = new Product();
    newProduct.name = name;
    const data = await newProduct.save();
    res.json(data);
  });

// endpoint to fetch all products metadata
app.get('/products', async function(req, res) {
    const products = await Product.find({});
    res.json(products);
  });

app.delete('/delete/:id', notLoggedInValidator, async function(req, res) {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);
  const media = await Video.find({ productId: product._id });
  media.forEach(e => {
    const path = process.env.STORAGE +`/${e.filename}.mp4`
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file removed
    })
  });
  await Product.findByIdAndDelete(id);
  await Video.deleteMany({ productId: product._id });
  res.json('deleted');
  });

module.exports = app;