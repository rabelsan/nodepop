/* eslint-disable no-undef */
var express = require('express');
const multer = require('multer');
var router = express.Router();
const Advertisement = require('../../models/Advertisement');
//uuid: Package For the creation of RFC4122 UUIDs
// Sample ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const { v4: uuidv4 } = require('uuid');

//Folders paths
const publicPath = './public/'
const imgFolder = 'images/';

const storage = multer.diskStorage({
  destination: function( req, file, cb) {
    cb(null, publicPath+imgFolder);
  },
  filename: function(req, file, cb) {
    const myFilename = `ad_${uuidv4()}_${file.originalname}`;
    cb(null, myFilename);
  }
});
const upload = multer({ storage: storage });

/* GET /api/ads */
router.get('/', async function(req, res, next) {
  try {

    // http://localhost:3000/api/agentes?precio=-12
    // http://localhost:3000/api/agentes?precio=12
    // http://localhost:3000/api/agentes?precio=12-
    // http://localhost:3000/api/agentes?precio=12-300
    const precio = req.query.precio;
    // http://localhost:3000/api/agentes?tag=bycicle%20trek
    const tag = req.query.tag;
    // http://localhost:3000/api/agentes?venta=true
    // http://localhost:3000/api/agentes?venta=false
    const venta = req.query.venta;

    // http://localhost:3000/api/agentes?limit=2
    const limit = parseInt(req.query.limit || 10);
    // http://localhost:3000/api/agentes?skip=20&limit=10
    const skip = parseInt(req.query.skip);

    // http://localhost:3000/api/agentes?sort=age
    // http://localhost:3000/api/agentes?sort=age name
    const sort = req.query.sort;

    // http://localhost:3000/api/agentes?fields=age%20-_id
    const fields = (req.query.fields) ? req.query.fields : '-__v'; 
    
    const filter = {};
    var filterExp;

    if (precio) {
      filterExp = priceFilter(precio);
      if (filterExp !== null) {
        filter.price = filterExp;
      }  
    }
    
    if (tag) {
      filterExp = tagFilter(tag);
      if (filterExp !== null) {
        filter.tags = filterExp;
      }  
    }

    if (venta) {
      filterExp = saleFilter(venta);
      if (filterExp !== null) {
        filter.sale = filterExp;
      }  
    }

  
    const advertisements = await Advertisement.list(filter, limit, skip, sort, fields);
    res.json(advertisements);
  
  } catch (err) {
    next(err);
  }
});

/* GET /api/ads/<_id> */
router.get('/:_id', async (req, res, next) => {
  try {

    const _id = req.params._id;

    const advertisement = await Advertisement.findOne({ _id: _id});

    res.json({ result: advertisement });

  } catch(err) {
    next(err);
  }
});

/* POST /api/ads/upload */
router.post('/upload', upload.single('photo'), async (req, res, next) => {
  //console.log(req.file);
  //console.log(req.body);

  try {
    const adData = req.body;
    adData.photo = imgFolder+req.file.filename;

    // create the document in memory
    const advertisement = new Advertisement(adData);
    // save into database
    const adSaved = await advertisement.save();

    res.json({ result: adSaved });

  } catch (err) {
    next(err);
  }
});

/* PUT /api/ads/:_id */
router.put('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const adData = req.body;

    const adSaved = await Advertisement.findOneAndUpdate({ _id: _id}, adData, {
      new: true,
      useFindAndModify: false // in order to avoid deprecated warningd
    });

    res.json({ result: adSaved });

  } catch (err) {
    next(err);
  }
});

/* DELETE /api/ads/:_id */
router.delete('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;

    //Before deleting the advertisement, find the item in order to get the photo path and remove it after delete de ad
    const advertisement = await Advertisement.findOne({ _id: _id});
    const fs = require('fs')
    await Advertisement.deleteOne({ _id: _id });
    fs.unlink(publicPath+advertisement.photo, (err) => {
      if (err) {
        console.error(err.message);
        return
      }
    })
    
    res.json();
  } catch (err) {
    next(err);
  }
});

//Price filter: Validates the filter and returns the price filter expression if correct. 
//Otherwise, it returns null.
function priceFilter(price) {
  var priceFilter = null;
  var priceArray = [];
  var re0 = new RegExp('[0-9]+\-[0-9]+|\-[0-9]+|[0-9]+\-|[0-9]+');
  var re1 = new RegExp('[0-9]+\-[0-9]+');
  var re2 = new RegExp('\-[0-9]+');
  var re3 = new RegExp('[0-9]+\-');
  var re4 = new RegExp('[0-9]+');

  if (re0.test(price)) {
    priceArray = re0.exec(price)[0].split('-');
    if (re1.test(price)) {
      priceFilter = { $gte: priceArray[0], $lte: +priceArray[1] };
    } else if (re2.test(price)) {
      priceFilter = { $lte: priceArray[1]};
    } else if (re3.test(price)) {
      priceFilter = { $gte: priceArray[0] };
    } else if (re4.test(price)) {
      priceFilter = priceArray[0];
    } 
  }
  return priceFilter;
}

//Tags filter: Validates the filter and returns the tag filter expression if correct. 
//Otherwise, it returns null.
function tagFilter(tags) {
  var tagFilter = null;
  var tagArray = tags.replace(/ {2}/g, '').split(' ');

  for (var i=0; i<tagArray.length; i++) {  
        tagArray[i] = '.*' + tagArray[i] + '.*';         
  }
  tagFilter = new RegExp(tagArray.join('|'));
  return tagFilter;
} 

//Sales filter: Validates the filter and returns the sale filter expression if correct. 
//Otherwise, it returns null.
function saleFilter(sale) {
  var saleFilter = null;
  
  if ((sale === 'true') || (sale === 'false')) {
    saleFilter = (sale === 'true') ? { $eq: true} : { $eq: false};
  }
 
  return saleFilter;
} 
module.exports = router;
