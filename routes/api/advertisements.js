/* eslint-disable no-undef */
var express = require('express');
const multer = require('multer');
var router = express.Router();
const Advertisement = require('../../models/Advertisement');
//uuid: For the creation of RFC4122 UUIDs
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function( req, file, cb) {
    cb(null, './public/images/');
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

    // http://localhost:3000/api/agentes?price=-12
    // http://localhost:3000/api/agentes?price=12
    // http://localhost:3000/api/agentes?price=12-
    // http://localhost:3000/api/agentes?price=12-300
    const price = req.query.price;
    // http://localhost:3000/api/agentes?tags=bycicle%20trek
    const tags = req.query.tags;

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

    if (price) {
      filterExp = priceFilter(price);
      if (filterExp !== null) {
        filter.price = filterExp;
      }  
      //filtro.price = price;
    }
    console.log('tags',tags);
    if (tags) {
      filter.tags = tags;
    }
    console.log(filter);

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
  console.log(req.file);
  console.log(req.body);

  try {
    const adData = req.body;
    adData.photo = req.file.destination+req.file.filename;

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

    await Advertisement.deleteOne({ _id: _id });

    res.json();
  } catch (err) {
    next(err);
  }
});

//Price filter: Validates de filter and returns the price filter expression if correct. 
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

module.exports = router;
