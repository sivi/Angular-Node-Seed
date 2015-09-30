/**
 * Created by a on 9/12/2015.
 */
// see https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
'use strict';
var async2 = require('async');
var testDB = (function(){

    var testDBUrl = 'mongodb://automaticTestUser:automaticPassword@localhost:27017/testDB';
    var collectionName = 'restaurants';

    var async = require('async');
    var mongoose = require('mongoose');
    var dataLoad = require('./testData');
    require('../../../services/model/restaurantModel');

    var Restaurant;

    return {
      prepareDB: function(){

        // auxiliary function to make for-loop simple!
        var saveItem = function(item) {
          var itemToSave = new Restaurant(item);
          itemToSave.save(function (err) {
            if (err)
              throw(err);
            console.log("saveItem --" + JSON.stringify(item));
          });
        };

        console.log("PrepareDB start");
        var testData = dataLoad.TestDataLoad();

        // connect if necessary
        if(!mongoose.connection.readyState){
          console.log("Connecting ..." + testDBUrl);
          mongoose.connect(testDBUrl); 	// connect to mongoDB database on modulus.io
        }

        Restaurant = mongoose.model('RestaurantModel');
        // check count before adding
        Restaurant.itemCount("", function(err, restaurantListCount){
          if (err && err.message != 'ns not found')
            return console.error(err);
          console.log("prepareDB items count BEFORE insert: " + restaurantListCount);
        });

        /*
        // DO NOT use async in functions that may be nested within other async loops!!!
        // also, in NodeJS all I/O are asynchronous, so, no need for async

        async.each(testData,
          // iterator
          function(item, callback){
            var itemToSave = new Restaurant(item);
            itemToSave.save(function (err) {
              if (err)
                throw(err);
              console.log("saveItem --" + JSON.stringify(item));
            });
            callback(); // mandatory thing in async !!!
          },
          // error handler
          function(err){
            if(err !== null)
              throw err;
          }
        );
        */
        for(var i=0; i < testData.length; i++){
          saveItem(testData[i]);
        }
        // data are NOT available for next 1 - 60 seconds,
        // required for MongoDB to store them onto disk,
        // so no use of checking them just now !!!
        console.log("PrepareDB END");
      },
      checkDB: function(err){
        // It takes some time *up to 60 seconds) for the data to become available
        setTimeout(function(){
          Restaurant.itemCount("", function(err, restaurantListCount){
            if (err && err.message != 'ns not found')
              return console.error(err);
            console.log("CheckDB items count: " + restaurantListCount);
          });
        },1000);
      },
      cleanDB: function(){
        if(!mongoose.connection.readyState){
          console.log("Connecting ..." + testDBUrl);
          mongoose.connect(testDBUrl); 	// connect to mongoDB database on modulus.io
        }
        // check count before adding
        mongoose.connection.collections['restaurants'].count(function(err, count){
          if (err && err.message != 'ns not found')
            return console.error(err);
          console.log("cleanDB items count BEFORE drop: " + count);
        });
        // Let's drop the database
        mongoose.connection.collections['restaurants'].drop( function(err) {
          if (err && err.message != 'ns not found')
            return console.error(err);
          // no use of any other dump,
          // database state has been changed meanwhile by other promise
        });
      }
    };
  }
)();

/*    DOES NOT WORK !!! async within async fails due to javascript lack of private instances
async2.series([
  testDB.prepareDB(),
  testDB.checkDB(),
  testDB.cleanDB(),
  testDB.checkDB()
], function (err, results) {
  // Here, results is an array of the value from each function
  console.log(results); // outputs: ['two', 'five']
});
 */
//
//  Despite all timeouts, it may fail!!!
//  USE Promises, like in testDB.js !!!
//
testDB.cleanDB();
// wait on DB to execute clean request before proceeding with inserts
setTimeout(function(){
  testDB.prepareDB();
  testDB.checkDB();
},5000);

setTimeout(function(){
//  testDB.cleanDB();
  testDB.checkDB();
},5000);
