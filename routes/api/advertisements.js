/* eslint-disable no-undef */
var express = require('express');
const multer = require('multer');
var router = express.Router();
const Agente = require('../../models/Adevertisement');
//uuid: For the creation of RFC4122 UUIDs
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const { v4: uuidv4, parse: uuidParse } = require('uuid');
console.log(uuidParse(uuidv4())); 

const storage = multer.diskStorage({
  destination: function( req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function(req, file, cb) {
    const myFilename = `ad_${file.fieldname}_${uuidParse(uuidv4())}`;
    cb(null, myFilename);
  }
});
const upload = multer({ storage: storage });

/* GET /api/ads */
router.get('/', async function(req, res, next) {
  try {

    // http://localhost:3000/api/agentes?name=Smith
    const name = req.query.name;
    // http://localhost:3000/api/agentes?age=36
    const age = req.query.age;

    // http://localhost:3000/api/agentes?limit=2
    const limit = parseInt(req.query.limit || 10);
    // http://localhost:3000/api/agentes?skip=20&limit=10
    const skip = parseInt(req.query.skip);

    // http://localhost:3000/api/agentes?sort=age
    // http://localhost:3000/api/agentes?sort=age name
    const sort = req.query.sort;

    // http://localhost:3000/api/agentes?fields=age%20-_id
    const fields = req.query.fields;

    const filtro = {};

    if (name) {
      filtro.name = name;
    }

    if (age) {
      filtro.age = age;
    }

    const advertisements = await Agente.list(filtro, limit, skip, sort, fields);
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

/* POST /api/ads */
router.post('/', async (req, res, next) => {
  try {
    const adData = req.body;

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

// eslint-disable-next-line no-unused-vars
router.post('/upload', upload.single('image'), (req, res, next) => {
  console.log(req.file);
  res.send('ok');
});

module.exports = router;
