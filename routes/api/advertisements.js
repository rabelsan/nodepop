/* eslint-disable no-undef */
var express = require('express');
const multer = require('multer');
var router = express.Router();
const Advertisement = require('../../models/Advertisement');
const lib = require('../../lib/utils.js');

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
/**
 * @api {GET} /api/ads?optionalQueryString List advertisements
 * @apiGroup Advertisements
 * @apiParam {queryString} precio. Price filter (<=n: ?price=-12, ?price=12, >=n: ?price=12-, >=n1<=n2: ?price=12-500) 
 * @apiParam {queryString} tag. Tag filter (?tag=tagFiler1, ?tag=tagFilter1%20tagFilter2...) 
 * @apiparam {queryString} venta. Sale/Buy filter (?venta=true, ?venta=false) 
 * @apiparam {queryString} limit. Query rows returned limit (?limit=2) 
 * @apiparam {queryString} skip. Query skips the N first row (?skip=2) 
 * @apiparam {queryString} sort. Query sort method (?sort=sale&20price) 
 * @apiparam {queryString} fields. Query skips the N first row (?fields=name, ?fields=name%20price-_id) 
  * @apiSuccess {Object[]} advertisements. Advertisement's list
 * @apiSuccess {Boolean} advertisements.sale Ad for sale/to buy
 * @apiSuccess {String} advertisements.tags Ad tags for searching
 * @apiSuccess {String} advertisemnts._id Ad id
 * @apiSuccess {String} advertisements.name Ad title
 * @apiSuccess {Number} advertisements.price Ad price
 * @apiSuccess {String} advertisements.photo Ad image file path
 * @apiSuccessExample {json} Success  http://localhost:3000/api/ads?precio=13-&tag=trek%20gua&venta=false
 *    HTTP/1.1 200 OK
 *    [{
 *      "sale": true,
 *        "tags": [
 *          "bicicletas",
 *          "bycicles",
 *          "trek",
 *          "madone"
 *        ],
 *      "_id": "5f5a6ae91be10bf7d4a1956a",
 *      "name": "Trek Madone SLR7",
 *      "price": 5800,
 *      "photo": "images/bike-trek-madone-SLR7.jpg"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', async function(req, res, next) {
  try {

    // http://localhost:3000/api/ads?precio=-12
    // http://localhost:3000/api/ads?precio=12
    // http://localhost:3000/api/ads?precio=12-
    // http://localhost:3000/api/ads?precio=12-300
    const precio = req.query.precio;
    // http://localhost:3000/api/ads?tag=bycicle%20trek
    const tag = req.query.tag;
    // http://localhost:3000/api/ads?venta=true
    // http://localhost:3000/api/ads?venta=false
    const venta = req.query.venta;

    // http://localhost:3000/api/ads?limit=2
    const limit = parseInt(req.query.limit || 10);
    // http://localhost:3000/api/ads?skip=2&limit=10
    const skip = parseInt(req.query.skip);

    // http://localhost:3000/api/ads?sort=age
    // http://localhost:3000/api/ads?sort=age name
    const sort = req.query.sort;

    // http://localhost:3000/api/ads?fields=age%20-_id
    const fields = (req.query.fields) ? req.query.fields : '-__v'; 
    
    const filter = {};
    var filterExp;

    if (precio) {
      filterExp = lib.priceFilter(precio);
      if (filterExp !== null) {
        filter.price = filterExp;
      }  
    }
    
    if (tag) {
      filterExp = lib.tagFilter(tag);
      if (filterExp !== null) {
        filter.tags = filterExp;
      }  
    }

    if (venta) {
      filterExp = lib.saleFilter(venta);
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
/**
 * @api {GET} /api/ads/<_id> List advertisement (providing the URL <_id> exists)
 * @apiGroup Advertisements
 * @apiParam {urlParam} _id. Row id 
 * @apiSuccess {Object[]} advertisements. Advertisement id 
 * @apiSuccess {Boolean} advertisements.sale Ad for sale/to buy
 * @apiSuccess {String} advertisements.tags Ad tags for searching
 * @apiSuccess {String} advertisemnts.name Ad title
 * @apiSuccess {Number} advertisemnts.price Ad price
 * @apiSuccess {String} advertisements.photo Ad image file path
 * @apiSuccessExample {json} Success  http://localhost:3000/5f5a6ae91be10bf7d4a1956a
 *    HTTP/1.1 200 OK
 *    [{
 *      "sale": true,
 *        "tags": [
 *          "bicicletas",
 *          "bycicles",
 *          "trek",
 *          "madone"
 *        ],
 *      "_id": "5f5a6ae91be10bf7d4a1956a",
 *      "name": "Trek Madone SLR7",
 *      "price": 5800,
 *      "photo": "images/bike-trek-madone-SLR7.jpg"
 *    }]
 * @apiErrorExample {error} List error
 *    HTTP/1.1 404 Not Found
 */
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
/**
 * @api {POST} /api/ads/upload Create a new advertisement based on POST file/body parameters
 * @apiGroup Advertisements
 * @apiParam {Boolean} advertisements.sale Ad for sale/to buy
 * @apiParam {String} advertisements.tags Ad tags for searching
 * @apiParam {String} advertisements.name Ad title
 * @apiParam {Number} advertisements.price Ad price
 * @apiParam {String} advertisements.photo Ad image file path
 * @apiSuccessExample {json} Success  
 *    HTTP/1.1 200 OK
 *    
  {
    "result": {
        "sale": true,
        "tags": [
            "casco",
            "moto"
        ],
        "_id": "5f5b9b0df9d13e2d0907582c",
        "name": "casco-Dexter-Proton-Negan",
        "price": 60,
        "photo": "images/ad_27942a04-233f-428a-905a-a793d2c847d3_casco-Dexter-Proton-Negan.jpg",
        "__v": 0
    }
  }
 * @apiErrorExample {error} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/upload', upload.single('photo'), async (req, res, next) => {
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
/**
 * @api {PUT} /api/ads/<_id> Modify advertisement (providing the URL <_id> exists)
 * @apiGroup Advertisements
 * @apiParam {Boolean} advertisements.sale Ad for sale/to buy OPTIONAL
 * @apiParam {String} advertisements.tags Ad tags for searching OPTIONAL
 * @apiParam {String} advertisements.name Ad title OPTIONAL
 * @apiParam {Number} advertisements.price Ad price OPTIONAL
 * @apiSuccessExample {json} Success PUT http://localhost:3000/api/ads/5f5b9b0df9d13e2d0907582c body: { name: "Casco NEGRO Dexter Proton Negan" }
 *    HTTP/1.1 200 OK
 *    
  {
    "result": {
        "sale": true,
        "tags": [
            "casco",
            "moto"
        ],
        "_id": "5f5b9b0df9d13e2d0907582c",
        "name": "Casco NEGRO Dexter Proton Negan",
        "price": 60,
        "photo": "images/ad_27942a04-233f-428a-905a-a793d2c847d3_casco-Dexter-Proton-Negan.jpg",
        "__v": 0
    }
  }
 * @apiErrorExample {error} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const adData = req.body;
    console.log(req.body);
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
/**
 * @api {DELETE} /api/ads/<_id> Delete advertisement (providing the URL <_id> exists) 
 * @apiGroup Advertisements
 * @apiSuccessExample {json} Success DELETE http://localhost:3000/api/ads/5f5b9b0df9d13e2d0907582c
 *    HTTP/1.1 200 OK
 * @apiErrorExample {error} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;

    /* Before deleting the advertisement, 
       retrieve the ad information in order to get the photo path
       and remove the file after delete the advert 
    */
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

module.exports = router;
