/**
 * Created by a on 9/11/2015.
 */

"use strict";

// mongoimport --db test --collection restaurants --drop --file primer-dataset.json

var mongoose = require('mongoose');
var config = require('config');

console.log("Connecting ..." + config.db);
mongoose.connect(databaseConfig.url); 	// connect to mongoDB database on modulus.io

require('../../../../services/model/restaurantModel');

var options = {
  criteria: {$and: [{borough: {$in: [ /^Man/i, /^Quee/i]}},
                    {cuisine: {$in: [ /^Amer/i ]}}
  ]},
  perPage: 5,
  page: 100,
  sort: '-name',
  select: 'restaurant_id name borough cuisine'
};

var restaurantModel = mongoose.model('RestaurantModel');

restaurantModel.lookup(options, function(err, restaurantList){
  if (err) return console.error(err);
  console.log("query " + restaurantList);
});

restaurantModel.itemCount(options, function(err, restaurantListCount){
  if (err) return console.error(err);
  console.log("query " + restaurantListCount);
});