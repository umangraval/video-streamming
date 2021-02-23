const express = require('express');
const { Category } = require('../model/Category');

const app = express();

app.post('/', async function(req, res) {
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

app.delete('/delete/:id', async function(req, res) {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
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
    await Video.deleteMany({ categoryname: category.name });
    res.json('deleted');
  });

module.exports = app;