/**
 * Created by a on 9/12/2015.
 */
'use strict';
var RestaurantIdCounter;
var testDB = (function(){

  var testDBUrl = 'mongodb://automaticTestUser:automaticPassword@localhost:27017/testDB';
  var collectionName = 'restaurants';

  var mongoose = require('mongoose');
  var dataLoad = require('./testData');
  require('../../../services/model/restaurantModel');
  require('../../../services/model/sequenceModel');

  var Restaurant;

  return {
      //
      //  --------------connectDB-----------
      //
      connectDB: function(){
        var promise = new Promise(function(resolve, reject){
          if(!mongoose.connection.readyState){
            console.log("cleanDB: Connecting ..." + testDBUrl);
            mongoose.connect(testDBUrl); 	// connect to mongoDB database on modulus.io
            if(!mongoose.connection.readyState){
              reject("Failed " + testDBUrl);
            }
            else{
              Restaurant = mongoose.model('RestaurantModel');
              RestaurantIdCounter = Restaurant.restaurantIdCounter();
              resolve(true);
            }
          }
        });
        return promise;
      },
      //
      //  --------------checkCounterState-----------
      //
      checkCounterState: function(sequencerName){
        return mongoose.model('CounterModel').checkInitialStatePromise(sequencerName);
      },
      //
      //  --------------prepareDB-----------
      //
      prepareDB: function(){

        // auxiliary function to make for-loop simple!
        // idea is that Promise is resolved in callback
        // of the save i.e. when document is stored and
        // ready to be retrieved from database
        //
        var saveTask = function(item){
          var promise = new Promise(function(resolve, reject){
            var restaurant_id;
            mongoose.model('CounterModel').getIdPromise(RestaurantIdCounter)
              .then(function(result){
                item.restaurant_id = result;
                var itemToSave = new Restaurant(item);
                itemToSave.save(function (err) {
                  //console.log("saveItem --" + JSON.stringify(item));
                  if (err)
                    reject(err);
                  else
                    resolve(true);
                });
              });
          });
          return promise;
        };

        var testData = dataLoad.TestDataLoad();

        var promises = [];
        for(var i=0; i < testData.length; i++){
          promises.push(saveTask(testData[i]));
        }
        // make synchronization block point Promise
        var preparePromise = Promise.all(promises);
        return preparePromise;
      },
      //
      //  --------------checkDB-----------
      //
      checkDB: function(description){
        var checkPromise = new Promise(function(resolve, reject) {
          Restaurant = mongoose.model('RestaurantModel');
          Restaurant.itemCount("", function (err, restaurantListCount) {
            if (err && err.message != 'ns not found') {
              console.error(err);
              reject(err);
            }
            console.log("CheckDB " + description +" items count: " + restaurantListCount);
            resolve(true);
          });
        });
        return checkPromise;
      },
      //
      //  --------------cleanDB-----------
      //
      cleanDB: function(){
        // Let's drop the database
        var collection = mongoose.connection.collections['restaurants'];
        var promise = new Promise(function(resolve, reject){
          collection.drop( function(err) {
            if (err && err.message != 'ns not found')
              return console.error(err);
            resolve(true);
          });
        });
        return promise;
      }
  };
})();

var ct0;
testDB.connectDB()
  .then(function(result){
    return testDB.checkCounterState(RestaurantIdCounter);})
  .then(function(result){
    return testDB.checkDB("Before clean");})
  .then(function(result){
    return testDB.cleanDB();})
  .then(function(result){
    return testDB.checkDB("Before prepare");})
  .then(function(result){
    ct0 = Date.now();
    return testDB.prepareDB();})
  .then(function(result){
    var ct1 = Date.now();
    console.log("Prepare time " + (ct1 - ct0));
    return testDB.checkDB("After prepare");})
  .catch(function(error){
    console.error(error);
  });
