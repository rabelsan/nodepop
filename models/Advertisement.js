/* eslint-disable no-undef */
'use strict';

const mongoose = require('mongoose');

// crear un esquema (https://mongoosejs.com/docs/schematypes.html)
const advertisementSchema = mongoose.Schema({
    name: { type: String, required:true, index: true},
    sale: {type: Boolean, required: true},
    price: {type: Number, required: true, index: true},
    photo: {data: Buffer, contentType: String},
    tags: {type: [String], index: true}
  },
  {
    autoIndex: process.env.NODE_ENV !== 'production', // no crear los índices automáticamente en producción (los crearé yo cuando me convenga)
  }
);

// método estático
advertisementSchema.statics.lista = function(filtro, limit, skip, sort, fields) {
  const query = Agente.find(filtro);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

// crear el modelo
const Agente = mongoose.model('Advertisements', advertisementSchema);

// exportar el modelo
module.exports = Agente;
