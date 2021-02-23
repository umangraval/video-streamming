const express = require('express');
const { Product } = require('../model/Product');

const app = express();

app.post('/', async function(req, res) {
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

app.delete('/delete/:id', async function(req, res) {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
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
  await Video.deleteMany({ productId: product._id });
  res.json('deleted');
  });

module.exports = app;