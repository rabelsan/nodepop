/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

const readline = require('readline');
const conn = require('./lib/connectMongoose');
const Adevertisement = require('./models/Advertisement');
const fs = require('fs');

conn.once('open', async () => {
  try {

    const respuesta = await askUser('Are you sure you want to initialize the Data Base with test data?  (yes/no)');

    if (respuesta.toLowerCase() !== 'yes') {
      console.log('Process aborted!');
      return process.exit(0);
    }

    await initAdvertisements();

    // close connection
    conn.close();

  } catch (err) {
    console.log('There was an error:', err);
    process.exit(1);
  }

});

async function initAdvertisements() {
  // delete all documents in collection
  console.log('Deleting all documents...');
  await Advertisement.deleteMany();

  // loading test documents
  console.log('Loading advertisements...');
  var new_img = new Img;
    new_img.img.data = fs.readFileSync('./public/images/trek-madone-SLR7.jpg')
    new_img.img.contentType = 'image/jpeg';
  const result = await Advertisement.insertMany([
    { name: 'Trek Madone SLR7', sale: true, price: 5800, photo: {data: fs.readFileSync('./public/images/trek-madone-SLR7.jpg'),  contentType:'image/jpeg'}},
    { name: 'Guantes Blegrass Manatee', sale: true, price: 12, photo: {data: fs.readFileSync('./public/images/guantes-bluegrass_manatee.jpg'),  contentType:'image/jpeg'}}
  ]);
  console.log(`${result.length} have been created.`);
}

function askUser(textoPregunta) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(textoPregunta, answer => {
      rl.close();
      resolve(answer);
    });
  });
}