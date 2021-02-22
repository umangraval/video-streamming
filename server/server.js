const express = require('express');
const fs = require('fs');
const thumbsupply = require('thumbsupply');
const cors  = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const { Product } = require('./model/Product');
const { Video } = require('./model/Video');
const busboyBodyParser = require('busboy-body-parser');

const app = express();

// var corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
//     name: 'Video 1'
//   },
//   {
//     id: 1,
//     poster: '/video/1/poster',
//     productid: 0,
//     name: 'Video 2'
//   },
// ];



app.use(cors());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/assets')      //you tell where to upload the files,
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.mp4')
  }
})

var upload = multer({storage: storage,
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
    },
});

app.post('/product', async function(req, res) {
  const { name } = req.body;
  const newProduct = new Product();
  newProduct.name = name;
  const data = await newProduct.save();
  res.json(data);
});

// app.route('/upload')
//     .post(function (req, res, next) {
//         const { name, productId } = req.body;
//         var fstream;
//         req.pipe(req.busboy);
//         req.busboy.on('file', async function (fieldname, file, filename) {
//           console.log(fieldname);
//             console.log("Uploading: " + filename);

//             //Path where image will be uploaded
//             const newFilename = `${Math.floor(Date.now() / 1000)}.mp4`;
//             const newVideo = new Video();
//             newVideo.name = name;
//             newVideo.productId = productId;
//             newVideo.filename = newFilename;
//             newVideo.poster = `/video/${name}/poster`;
//             const data = await newVideo.save();
            
//             fstream = fs.createWriteStream('./assets/' + newFilename);
//             file.pipe(fstream);
//             fstream.on('close', function () {    
//                 console.log("Upload Finished of " + filename);              
//                 res.json(data);           //where to go next
//             });
//         });
//     });

// ===========================================================

app.post('/upload', upload.single('file'), async function (req, res) {
  const { name, productId } = req.body;
  const { filename } = req.file; 
  const newVideo = new Video();
  newVideo.name = name;
  newVideo.productId = productId;
  newVideo.filename = filename.split('.')[0];
  newVideo.poster = `/video/${filename.split('.')[0]}/poster`;
  const data = await newVideo.save();
  res.json(data);
})


// ===========================================================
// Production code 

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

// ==========================================================

// // endpoint to fetch all videos metadata
// app.get('/videos/:productid', function(req, res) {
//   const id = parseInt(req.params.productid, 10);
//   let pvideos = videos.filter(function (e) {
//     return e.productid == id;
//   });
//   res.json(pvideos);
// });

// // endpoint to fetch all products metadata
// app.get('/products', function(req, res) {
//   res.json(products);
// });

// // endpoint to fetch a single video's metadata
// app.get('/video/:id/data', function(req, res) {
//   const id = parseInt(req.params.id, 10);
//   res.json(videos[id]);
// });

// ==========================================================
app.get('/video/:name/poster', function(req, res) {
  thumbsupply.generateThumbnail(__dirname + `/assets/${req.params.name}.mp4`)
    .then(thumb => res.sendFile(thumb))
    .catch(err => console.log(err))
});

// // endpoint to fetch a single video's metadata
// app.get('/video/:id/data', async function(req, res) {
//   const { id } = req.params;
//   const video = await Video.findById(id);
//   res.json(video);
// });

app.get('/video/:id', function(req, res) {
  const path = __dirname + `/assets/${req.params.id}.mp4`;
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