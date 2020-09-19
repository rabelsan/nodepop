/* eslint-disable no-undef */
'use strict';

const mongoose = require('mongoose');

//  Mongoose schema definition (https://mongoosejs.com/docs/schematypes.html)
const advertisementSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Advertisement name is mandatory!'], index: true},
    sale: {type: Boolean, default: true, index: true},
    price: {type: Number, required: [true, 'Price required'], index: true},
    photo: {type: String},
    tags: {type: [String], index: true}
  },
  {
    autoIndex: process.env.NODE_ENV !== 'production', // do not create automatically indexes in production env
  }
);

// Static method for db queries
advertisementSchema.statics.list = function(filter, limit, skip, sort, fields) {
  const query = Advertisement.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

// Model creation
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

// Model export
module.exports = Advertisement;
