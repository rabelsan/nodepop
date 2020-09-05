/* eslint-disable no-undef */
'use strict';

const mongoose = require('mongoose');

// crear un esquema (https://mongoosejs.com/docs/schematypes.html)
const advertisementSchema = mongoose.Schema({
    name: { type: String, required:true, index: true},
    sale: {type: Boolean, required: true},
    price: {type: Number, required: true, index: true},
    photo: {type: String},
    tags: {type: [String], index: true}
  },
  {
    autoIndex: process.env.NODE_ENV !== 'production', // do not create automatically indexes in production env
  }
);

// método estático
advertisementSchema.statics.list = function(filtro, limit, skip, sort, fields) {
  const query = Advertisement.find(filtro);
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
