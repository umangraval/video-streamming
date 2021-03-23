const express = require("express");
const fs = require("fs");
const thumbsupply = require("thumbsupply");
const multer = require("multer");
const { Media } = require("../model/Media");
const notLoggedInValidator = require("../validation/notLoggedInValidator");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const app = express();

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, process.env.STORAGE); //you tell where to upload the files,
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  onFileUploadStart: function(file) {
    console.log(file.originalname + " is starting ...");
  }
});

app.post("/upload", notLoggedInValidator, upload.single("file"), async function(
  req,
  res
) {
  try {
    const { name, productId, categoryname, description } = req.body;
    const { filename } = req.file;
    const extimg = ["jpg", "jpeg", "png"];
    const extvideo = ["mp4"];
    if (extimg.includes(filename.split(".")[1])) {
      const newImage = new Media();
      newImage.name = name;
      newImage.productId = productId;
      newImage.categoryname = categoryname;
      newImage.filename = filename;
      newImage.poster = `/media/image/${filename}/poster`;
      newImage.description = description;
      const data = await newImage.save();
      return res.json(data);
    } else if (extvideo.includes(filename.split(".")[1])) {
      const newVideo = new Media();
      newVideo.name = name;
      newVideo.productId = productId;
      newVideo.categoryname = categoryname;
      newVideo.filename = filename;
      newVideo.poster = `/media/video/${filename}/poster`;
      newVideo.description = description;
      const data = await newVideo.save();
      return res.json(data);
    } else {
      return res.json("Format not supported. Only mp4, jpg");
    }
  } catch (e) {
    console.log("Error", e);
  }
});

// endpoint to fetch all videos metadata
app.get("/medias/:productId", async function(req, res) {
  try {
    const { productId } = req.params;
    const pmedias = await Media.find({ productId });
    res.json(pmedias);
  } catch (e) {
    console.log("Error", e);
  }
});

app.get("/video/:name/poster", function(req, res) {
  thumbsupply
    .generateThumbnail(process.env.STORAGE + `/${req.params.name}`)
    .then(thumb => res.sendFile(thumb))
    .catch(err => console.log(err));
});

app.get("/image/:name/poster", function(req, res) {
  res.sendFile(process.env.STORAGE + `/${req.params.name}`);
});

// endpoint to fetch a single video's metadata
app.get("/video/:id/data", async function(req, res) {
  try {
    const { id } = req.params;
    const video = await Media.findById(id);
    res.json(video);
  } catch (e) {
    console.log("Error", e);
  }
});

app.get("/video/:id", function(req, res) {
  try {
    const path = process.env.STORAGE + `/${req.params.id}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      console.log("we have range", range);
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      console.log(parts);
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "image/jpg"
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      console.log("no range", range);
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4"
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  } catch (e) {
    console.log("Error", e);
  }
});

app.delete("/delete/:id", notLoggedInValidator, async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    const path = process.env.STORAGE + `/${media.filename}`;
    fs.unlink(path, err => {
      if (err) {
        console.error(err);
        return;
      }
      //file removed
    });
    await Media.findByIdAndDelete(id);
    return res.json("Media Deleted");
  } catch (e) {
    console.log("Error", e);
  }
});

module.exports = app;
