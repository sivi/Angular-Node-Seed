/**
 * Created by a on 9/15/2015.
 */
// see http://grokbase.com/t/gg/mongoose-orm/133wp0g9h1/mongoose-managing-my-own-custom-ids
//
'use strict';
var mongoose = require('mongoose');

// Collection to hold counters/sequences for ids
var countersSchema = mongoose.Schema({
    _id: { type: String, required: true },
    sequence: { type: Number, required: true }
  },{
    versionKey: false
  }
);

// Creates the Model for the Attachments Schema

  // when counter does not exist prior to the call,
  // it is created, yet, result of call is not set
  // thus creating error in handling.
  // Therefore, check existence, and insert seed
  // if it does not exist.
countersSchema.statics.checkInitialState = function(collection, callback){
    var CounterModel = mongoose.model('CounterModel');
    var lookupQuery = {_id: collection};
    var checkQuery = CounterModel.find(lookupQuery);
    checkQuery.select('sequence');
    checkQuery.exec(function(err, resultSet) {
      if (err) // handle error
        throw new Error(err);

      if (resultSet.length === 0){
        var seed = {
          _id: collection,
          sequence: 0
        };
        var seedItem = new CounterModel(seed);
        seedItem.save(function(err, result){
          if (err) // handle error
            throw new Error(err);
          callback(result.sequence);
        });
      }
      else
        callback(resultSet[0].sequence);
    });
};

countersSchema.statics.checkInitialStatePromise = function(sequencerName){
    var initialStatePromise = new Promise(function(resolve, reject){
      var CounterModel = mongoose.model('CounterModel');
      CounterModel.checkInitialState(sequencerName, function(id) {
        resolve(true);
      });
    });
    return initialStatePromise;
};

countersSchema.statics.getNext = function(collection, callback) {
    var CounterModel = mongoose.model('CounterModel');
    var query = {_id: collection};
    var update = {$inc: {sequence: 1}};
    var options = {upsert: true};
     CounterModel.findOneAndUpdate(query, update, options, function(err, counter)
    {
      if (err) // handle error
        throw new Error(err);
      callback(counter.sequence);
    });
};

countersSchema.statics.getIdPromise = function(sequencerName){
    var sequencerPromise = new Promise(function(resolve, reject){
      var CounterModel = mongoose.model('CounterModel');
      CounterModel.getNext(sequencerName, function(id) {
        resolve(id);
      });
    });
    return sequencerPromise;
};


module.exports = function(mongoose) {
  return {
    checkInitialState: checkInitialState,
    checkInitialStatePromise: checkInitialStatePromise,
    getNext: getNext,
    getIdPromise: getIdPromise
  };
};

var collectionName = 'counters';
var countersModel = mongoose.model('CounterModel', countersSchema, collectionName);

/*
Now you can do something like:
getNext('person', function(id) {
// create a new person with the next id
});
*/
