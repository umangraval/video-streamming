const express = require("express");
const fs = require("fs");
const { Category } = require("../model/Category");
const { Media } = require("../model/Media");
const notLoggedInValidator = require("../validation/notLoggedInValidator");

const app = express();

app.post("/", notLoggedInValidator, async function(req, res) {
  try {
    const { name } = req.body;
    const newCategory = new Category();
    newCategory.name = name;
    const data = await newCategory.save();
    res.json(data);
  } catch (e) {
    console.log("Error", e);
  }
});

// endpoint to fetch all categories metadata
app.get("/categories", async function(req, res) {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (e) {
    console.log("Error", e);
  }
});

app.delete("/delete/:id", notLoggedInValidator, async function(req, res) {
  try {
    const { id } = req.params;
    // const category = await Category.findById(id);
    // const media = await Media.find({ categoryname: category.name });
    // media.forEach(e => {
    //   const path = process.env.STORAGE + `/${e.filename}.mp4`;
    //   fs.unlink(path, err => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     //file removed
    //   });
    // });
    await Category.findByIdAndDelete(id);
    // await Media.deleteMany({ categoryname: category.name });
    res.json("deleted");
  } catch (e) {
    console.log("Error", e);
  }
});

module.exports = app;
