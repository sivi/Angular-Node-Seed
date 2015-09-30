/**
 * Created by a on 9/14/2015.
 */
'use strict';
// see https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html

var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
var testDBUrl = 'mongodb://automaticTestUser:automaticPassword@localhost:27017/testDB';
//
//  NOTE:
//        NodeJS driver side does not wait for result from database
//        It requires chaining of promises, as a solution
//
var connection = MongoClient.connect(testDBUrl, function(err, db) {
  if(err) throw err;
  var collection = db.collection('restaurants');
  collection.count(function(err, count){
    console.log("err " + err);
    console.log("count " + count);
    // MUST be here
    // see http://stackoverflow.com/questions/26346089/mongodb-server-sockets-closed-no-fix-found
    db.close();
  });
});
