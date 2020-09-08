/* eslint-disable no-undef */
'use strict';

const mongoose = require('mongoose');

// crear un esquema (https://mongoosejs.com/docs/schematypes.html)
const advertisementSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Advertisement name is mandatory!'], index: true},
    sale: {type: Boolean, default: true},
    price: {type: Number, required: [true, 'Price required'], index: true},
    photo: {type: String},
    tags: {type: [String], index: true}
  },
  {
    autoIndex: process.env.NODE_ENV !== 'production', // do not create automatically indexes in production env
  }
);

// método estático
advertisementSchema.statics.list = function(filter, limit, skip, sort, fields) {
  const query = Advertisement.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

// crear el modelo
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

// exportar el modelo
module.exports = Advertisement;
