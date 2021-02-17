const express = require('express');
const fs = require('fs');
const busboy = require('connect-busboy');
const thumbsupply = require('thumbsupply');
const cors  = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Product } = require('./model/Product');
const { Video } = require('./model/Video');
const busboyBodyParser = require('busboy-body-parser');

const app = express();
app.use(busboy());

// var corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser());


// Database Connection
mongoose.connect("mongodb://localhost/mydb", {useNewUrlParser: true});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected');
});

// When the connection is disconnected:
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});



// const products = [
//   {
//     id: 0,
//     name: 'Product 1'
//   },
// ];

// const videos = [
//   {
//     id: 0,
//     poster: '/video/0/poster',
//     productid: 0,
//     // duration: '3 mins',
//     name: 'Video 1'
//   },
//   {
//     id: 1,
//     poster: '/video/1/poster',
//     productid: 1,
//     // duration: '4 mins',
//     name: 'Video 2'
//   },
// ];

app.use(cors());

app.post('/product', async function(req, res) {
  const { name } = req.body;
  const newProduct = new Product();
  newProduct.name = name;
  const data = await newProduct.save();
  res.json(data);
});

app.route('/upload')
    .post(function (req, res, next) {
        const { name, productId } = req.body;
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', async function (fieldname, file, filename) {
          console.log(fieldname);
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            const newFilename = `${Math.floor(Date.now() / 1000)}.mp4`;
            const newVideo = new Video();
            newVideo.name = name;
            newVideo.productId = productId;
            newVideo.filename = newFilename;
            newVideo.poster = `/video/${name}/poster`;
            const data = await newVideo.save();
            
            fstream = fs.createWriteStream('./assets/' + newFilename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.json(data);           //where to go next
            });
        });
    });

// endpoint to fetch all videos metadata
app.get('/videos/:productId', async function(req, res) {
  const { productId } = req.params;
  const pvideos = await Video.find({ productId });
  res.json(pvideos);
});

// endpoint to fetch all products metadata
app.get('/products', async function(req, res) {
  const products = await Product.find({});
  res.json(products);
});

// app.get('/video/:id/caption', function(req, res) {
//   res.sendFile('assets/captions/sample.vtt', { root: __dirname });
// });

app.get('/video/:name/poster', function(req, res) {
  thumbsupply.generateThumbnail(`assets/${req.params.name}.mp4`)
    .then(thumb => res.sendFile(thumb))
    .catch(err => console.log(err))
});

// endpoint to fetch a single video's metadata
app.get('/video/:id/data', async function(req, res) {
  const { id } = req.params;
  const video = await Video.findById(id);
  res.json(video);
});

app.get('/video/:id', function(req, res) {
  const path = `assets/${req.params.id}.mp4`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    console.log('we have range', range);
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
      console.log(parts)
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    console.log('no range', range);
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

app.listen(4000, function () {
  console.log('Listening on port 4000!')
});