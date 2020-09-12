define({ "api": [
  {
    "type": "DELETE",
    "url": "/api/ads/<_id>",
    "title": "Delete advertisement (providing the URL <_id> exists)",
    "group": "Advertisements",
    "success": {
      "examples": [
        {
          "title": "Success DELETE http://localhost:3000/api/ads/5f5b9b0df9d13e2d0907582c",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "error"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/advertisements.js",
    "groupTitle": "Advertisements",
    "name": "DeleteApiAds_id"
  },
  {
    "type": "GET",
    "url": "/api/ads?optionalQueryString",
    "title": "List advertisements",
    "group": "Advertisements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "queryString",
            "optional": false,
            "field": "precio.",
            "description": "<p>Price filter (&lt;=n: ?price=-12, ?price=12, &gt;=n: ?price=12-, &gt;=n1&lt;=n2: ?price=12-500)</p>"
          },
          {
            "group": "Parameter",
            "type": "queryString",
            "optional": false,
            "field": "tag.",
            "description": "<p>Tag filter (?tag=tagFiler1, ?tag=tagFilter1%20tagFilter2...)</p>"
          },
          {
            "group": "Parameter",
            "type": "queryString",
            "optional": false,
            "field": "venta.",
            "description": "<p>Sale/Buy filter (?venta=true, ?venta=false)</p>"
          },
          {
            "group": "Parameter",
            "type": "queryString",
            "optional": false,
            "field": "limit.",
            "description": "<p>Query rows returned limit (?limit=2)</p>"
          },
          {
            "group": "Parameter",
            "type": "queryString",
            "optional": false,
            "field": "skip.",
            "description": "<p>Query skips the N first row (?skip=2)</p>"
          },
          {
            "group": "Parameter",
            "type": "queryString",
            "optional": false,
            "field": "sort.",
            "description": "<p>Query sort method (?sort=sale&amp;20price)</p>"
          },
          {
            "group": "Parameter",
            "type": "queryString",
            "optional": false,
            "field": "fields.",
            "description": "<p>Query skips the N first row (?fields=name, ?fields=name%20price-_id)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "advertisements.",
            "description": "<p>Advertisement's list</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "advertisements.sale",
            "description": "<p>Ad for sale/to buy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "advertisements.tags",
            "description": "<p>Ad tags for searching</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "advertisemnts._id",
            "description": "<p>Ad id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "advertisements.name",
            "description": "<p>Ad title</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "advertisements.price",
            "description": "<p>Ad price</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "advertisements.photo",
            "description": "<p>Ad image file path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success  http://localhost:3000/api/ads?precio=13-&tag=trek%20gua&venta=false",
          "content": "HTTP/1.1 200 OK\n[{\n  \"sale\": true,\n    \"tags\": [\n      \"bicicletas\",\n      \"bycicles\",\n      \"trek\",\n      \"madone\"\n    ],\n  \"_id\": \"5f5a6ae91be10bf7d4a1956a\",\n  \"name\": \"Trek Madone SLR7\",\n  \"price\": 5800,\n  \"photo\": \"images/bike-trek-madone-SLR7.jpg\"\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/advertisements.js",
    "groupTitle": "Advertisements",
    "name": "GetApiAdsOptionalquerystring"
  },
  {
    "type": "GET",
    "url": "/api/ads/<_id>",
    "title": "List advertisement (providing the URL <_id> exists)",
    "group": "Advertisements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "urlParam",
            "optional": false,
            "field": "_id.",
            "description": "<p>Row id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "advertisements.",
            "description": "<p>Advertisement id</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "advertisements.sale",
            "description": "<p>Ad for sale/to buy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "advertisements.tags",
            "description": "<p>Ad tags for searching</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "advertisemnts.name",
            "description": "<p>Ad title</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "advertisemnts.price",
            "description": "<p>Ad price</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "advertisements.photo",
            "description": "<p>Ad image file path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success  http://localhost:3000/5f5a6ae91be10bf7d4a1956a",
          "content": "HTTP/1.1 200 OK\n[{\n  \"sale\": true,\n    \"tags\": [\n      \"bicicletas\",\n      \"bycicles\",\n      \"trek\",\n      \"madone\"\n    ],\n  \"_id\": \"5f5a6ae91be10bf7d4a1956a\",\n  \"name\": \"Trek Madone SLR7\",\n  \"price\": 5800,\n  \"photo\": \"images/bike-trek-madone-SLR7.jpg\"\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 404 Not Found",
          "type": "error"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/advertisements.js",
    "groupTitle": "Advertisements",
    "name": "GetApiAds_id"
  },
  {
    "type": "POST",
    "url": "/api/ads/upload",
    "title": "Create a new advertisement based on POST file/body parameters",
    "group": "Advertisements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "advertisements.sale",
            "description": "<p>Ad for sale/to buy</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "advertisements.tags",
            "description": "<p>Ad tags for searching</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "advertisements.name",
            "description": "<p>Ad title</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "advertisements.price",
            "description": "<p>Ad price</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "advertisements.photo",
            "description": "<p>Ad image file path</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success  ",
          "content": " HTTP/1.1 200 OK\n \n{\n  \"result\": {\n      \"sale\": true,\n      \"tags\": [\n          \"casco\",\n          \"moto\"\n      ],\n      \"_id\": \"5f5b9b0df9d13e2d0907582c\",\n      \"name\": \"casco-Dexter-Proton-Negan\",\n      \"price\": 60,\n      \"photo\": \"images/ad_27942a04-233f-428a-905a-a793d2c847d3_casco-Dexter-Proton-Negan.jpg\",\n      \"__v\": 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "error"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/advertisements.js",
    "groupTitle": "Advertisements",
    "name": "PostApiAdsUpload"
  },
  {
    "type": "PUT",
    "url": "/api/ads/<_id>",
    "title": "Modify advertisement (providing the URL <_id> exists)",
    "group": "Advertisements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "advertisements.sale",
            "description": "<p>Ad for sale/to buy OPTIONAL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "advertisements.tags",
            "description": "<p>Ad tags for searching OPTIONAL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "advertisements.name",
            "description": "<p>Ad title OPTIONAL</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "advertisements.price",
            "description": "<p>Ad price OPTIONAL</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success PUT http://localhost:3000/api/ads/5f5b9b0df9d13e2d0907582c body: { name: \"Casco NEGRO Dexter Proton Negan\" }",
          "content": " HTTP/1.1 200 OK\n \n{\n  \"result\": {\n      \"sale\": true,\n      \"tags\": [\n          \"casco\",\n          \"moto\"\n      ],\n      \"_id\": \"5f5b9b0df9d13e2d0907582c\",\n      \"name\": \"Casco NEGRO Dexter Proton Negan\",\n      \"price\": 60,\n      \"photo\": \"images/ad_27942a04-233f-428a-905a-a793d2c847d3_casco-Dexter-Proton-Negan.jpg\",\n      \"__v\": 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "error"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/advertisements.js",
    "groupTitle": "Advertisements",
    "name": "PutApiAds_id"
  }
] });
