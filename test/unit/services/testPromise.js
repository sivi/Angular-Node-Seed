/**
 * Created by a on 9/15/2015.
 */
// see https://www.npmjs.com/package/core-js#ecmascript-6-promise
"use strict";

var runTask = function(taskName, delay, callback ) {
  setTimeout(function () {
    callback();
  }, delay);

};
var pTask = function (taskName, delay) {
  var promise = new Promise(function (resolve, reject) {
    runTask(taskName, delay, function(){
      if(delay < 1000)
        reject(taskName + " too short "+ delay);
      else
      //console.log("resolve " + delay);
      resolve(taskName + " resolve " + delay);
    });
  });
  console.log("pTask "+ taskName + " set " + delay);
  return promise;
}
//
//  --------------  Sequences  -----------------
//
// Fails in second tast
var sequenceA = function(){
  pTask("A", 2000)
    .then(function(result){
      console.log("result 1 " + result);
      return pTask("B", 200);
    })
    .then(function(result){
      console.log("result 2 " + result);
      return pTask("C", 1000);
    })
    .then(function(result){
      console.log("result 3 " + result);
    })
    .catch(function(error){
      console.error(error);
    });
};
// runs entire sequence
var sequenceB = function(){
  pTask("D", 3000)
    .then(function(result){
      console.log("result 4 " + result);
      return pTask("E", 2000);
    })
    .then(function(result){
      console.log("result 5 " + result);
      return pTask("F", 1000);
    })
    .then(function(result){
      console.log("result 6 " + result);
    })
    .catch(function(error){
      console.error(error);
    });
};
//
//  --------------  Barrier synchronization  -----------------
//
var parralelSynchronization = function(){
  var ct0 = Date.now();
  var ct1;
  var tasks = [pTask("AP", 3000),pTask("BP", 3000),pTask("CP", 1000)];
  var allPromise = Promise.all(tasks);
  allPromise.then(function(result){
    var ct1 = Date.now();
    console.log(result);
    console.log("parallel running time " + (ct1 - ct0));
    return pTask("DSeq", 2000);})
    .then(function(result){
      var ct1 = Date.now();
      console.log(result);
      console.log("total running time " + (ct1 - ct0));
    })
    .catch(function(error){
      console.error(error);
    });
};
//
//  --------------  Race synchronization  -----------------
//
// shortest task wins!
var race1 = function(){
  var tasks0  = [pTask("AR", 3000),pTask("BR", 3000),pTask("CR", 1000)];
  var racePromise = Promise.race(tasks0);
  racePromise.then(function(result){
    console.log(result);
  })
    .catch(function(error){
      console.error(error);
    });
};
// shortest task crashes whole race!
var race2 = function(){
  var tasks0  = [pTask("AR", 300),pTask("BR", 3000),pTask("CR", 1000)];
  var racePromise = Promise.race(tasks0);
  racePromise.then(function(result){
    console.log(result);
  })
    .catch(function(error){
      console.error(error);
    });
};
//sequenceA();
//sequenceB();
parralelSynchronization();
// race1();
// race2();
