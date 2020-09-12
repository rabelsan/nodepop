<h1 align="center">Welcome to Nodepop: the tiny Wallapop 👋</h1>
<p>
  <a href="https://github.com/rabelsan/nodepop" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@rabelsan/nodepop.svg">
  </a>
</p>

## Install

```sh
npm install @rabelsan/nodepop
```

## Configure environment variables

Copy .env.example to .env and review the settings.

```sh
cp .env.example .env
```

## Load initial data

You can load the database with initial data with:

```sh
npm run init-db
```

**Warning! this script delete database contents before the load.**

Use in production only in the first deployment.

## Usage

```sh
npm start
```

## Development start

```sh
npm run dev
```

## API Methods

### List of advertisements

GET /api/ads

  [
    {
      "sale": true,
      "tags": [
        "bicicletas",
        "bycicles",
        "trek",
        "madone"
      ],
      "_id": "5f5a6ae91be10bf7d4a1956a",
      "name": "Trek Madone SLR7",
      "price": 5800,
      "photo": "images/bike-trek-madone-SLR7.jpg"
    }
  ]

Example filters:

* http://localhost:3000/api/ads?price=20
* http://localhost:3000/api/ads?price=-20
* http://localhost:3000/api/ads?price=20-
* http://localhost:3000/api/ads?price=20-1500
* http://localhost:3000/api/ads?tag=bike
* http://localhost:3000/api/ads?tag=bike%20trek
* http://localhost:3000/api/ads?sale=true
* http://localhost:3000/api/ads?price=-6000&tag=bike%20trek&sale=true
* http://localhost:3000/api/ads?limit=2
* http://localhost:3000/api/ads?skip=20&limit=10
* http://localhost:3000/api/ads?sort=name
* http://localhost:3000/api/ads?sort=name%20price
* <http://localhost:3000/api/ads?fields=name%20-_id> (Only name filed excluding the _id)

### Retrieves one advertisement

GET /api/ads/_id

  {
    "result": {
    "sale": false,
    "tags": [
      "guantes",
      "globes",
      "bicicleta",
      "bycicle"
    ],
    "_id": "5f5a6ae91be10bf7d4a1956b",
    "name": "Guantes Bluegrass Manatee",
    "price": 12,
    "photo": "images/guantes-bluegrass-manatee.jpg",
    "__v": 0
  }

### Create advertisement

POST /api/ads/upload file: {'photo=../casco-Dexter-Proton-Negan.jpg'}
                     body: { name: 'casco-Dexter-Proton-Negan', sale: 'true', price: '60', tags: [ 'casco', 'moto' ]}
  
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

### Update advertisement

PUT /api/ads/<_id> body: { name: "Casco NEGRO Dexter Proton Negan" }

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


### Delete advertisement

DELETE /api/ads/<_id>

Returns: HTTPCode 200

## How to start a local mongodb instance for development

```sh
./bin/mongod --dbpath ./data/db --directoryperdb
```

## APIDOC (Requires to start the application first)

<p>
  <a href="http://localhost:3000/apidoc/index.html" target="_blank">API Reference</a>
</p>

## Author

👤 **Ramón Beltrán**

* Github: [@rabelsan](https://github.com/rabelsan)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
