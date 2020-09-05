/* eslint-disable no-undef */
'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB in', mongoose.connection.name);
});

mongoose.connection.on('error', err => {
  console.log('Connection error', err);
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose.connection;
