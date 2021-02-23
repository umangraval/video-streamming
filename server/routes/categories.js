const express = require('express');
const fs = require('fs');
const { Category } = require('../model/Category');
const { Video } = require('../model/Video');
const notLoggedInValidator = require('../validation/notLoggedInValidator');

const app = express();

app.post('/', notLoggedInValidator, async function(req, res) {
    const { name } = req.body;
    const newCategory = new Category();
    newCategory.name = name;
    const data = await newCategory.save();
    res.json(data);
  });

  // endpoint to fetch all categories metadata
app.get('/categories', async function(req, res) {
    const categories = await Category.find({});
    res.json(categories);
  });

app.delete('/delete/:id', notLoggedInValidator, async function(req, res) {
    const { id } = req.params;
    const category = await Category.findById(id);
    const media = await Video.find({ categoryname: category.name });
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
    await Category.findByIdAndDelete(id);
    await Video.deleteMany({ categoryname: category.name });
    res.json('deleted');
  });

module.exports = app;