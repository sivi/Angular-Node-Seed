/**
 * Created by a on 9/10/2015.
 */
"use strict";
var mongoose = require('mongoose');

/*
{"address":
  {"building": "1007",
   "coord": [-73.856077, 40.848447],
   "street": "Morris Park Ave",
   "zipcode": "10462"},
  "borough": "Bronx",
  "cuisine": "Bakery",
  "grades": [{"date": {"$date": 1393804800000}, "grade": "A", "score": 2},
            ...
             {"date": {"$date": 1299715200000}, "grade": "B", "score": 14}],
  "name": "Morris Park Bake Shop",
  "restaurant_id": "30075445"}
*/
var restaurantSchema = mongoose.Schema({
  address:
    {building: String,
     coord: [Number, Number],
     street: String,
     zipcode: Number},
  borough: String,
  cuisine: String,
  grades: [{date: {$date: Date}, grade: String, score: Number}],
  name: String,
  restaurant_id: Number
});

restaurantSchema.method('setStrict', function (strict) {
  this.set();
});

/**
 * Find restaurant by id
 *
 * @param {ObjectId} id restaurant_id
 * @param {Function} aCallback caller's function
 */
restaurantSchema.static('load', function (id, aCallback) {
  this.findOne({ restaurant_id : id })
    .exec(aCallback);
});

/**
 * List restaurants
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
restaurantSchema.static('lookup', function (options, aCallback) {

  console.log("options " + JSON.stringify(options));

  var criteria = options.criteria || {};

  var query = this.find(criteria);
  if(options.select){
    query.select(options.select);
  }
  if(options.sort){
    query.sort(options.sort); // sort by date
  }
  if(options.perPage){
    query.limit(options.perPage);
  }
  if(options.page){
    query.skip(options.perPage * options.page);
  }
  query.exec(aCallback);
});
/**
 * Count restaurants
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
restaurantSchema.static('itemCount', function (options, aCallback) {
  var criteria = options.criteria || {};
  this.count(criteria)
    .exec(aCallback);
});

restaurantSchema.statics.restaurantIdCounter = function(){
  return "restaurant_id";
}

var collectionName = 'restaurants';
var restaurantModel = mongoose.model('RestaurantModel', restaurantSchema, collectionName);

