'use strict';

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

// eslint-disable-next-line no-undef
module.exports = {priceFilter, tagFilter, saleFilter}