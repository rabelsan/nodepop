var express = require('express');
var router = express.Router();
const Advertisement = require('../models/Advertisement');


router.get('/', async function(req, res, next) {
  try {
  
    const advertisements = await Advertisement.list();
    res.render('index', { title: 'Nodepop', ads: advertisements });
  
  } catch(err) {
    next(err);  
  }
});

module.exports = router;
