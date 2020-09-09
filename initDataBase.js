/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

const readline = require('readline');
const conn = require('./lib/connectMongoose');
const Advertisement = require('./models/Advertisement');

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
  const result = await Advertisement.insertMany([
    { name: 'Trek Madone SLR7', 
      sale: true, 
      price: 5800, 
      photo: 'images/bike-trek-madone-SLR7.jpg',
      tags: ['bicicletas','bycicles','trek','madone']
    },
    { name: 'Guantes Bluegrass Manatee', 
      sale: false, 
      price: 12, 
      photo: 'images/guantes-bluegrass-manatee.jpg',
      tags: ['guantes','globes','bicicleta','bycicle']
    }
  ]);
  console.log(`${result.length} advertisements have been created.`);
}

function askUser(textoPregunta) {
  // eslint-disable-next-line no-unused-vars
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