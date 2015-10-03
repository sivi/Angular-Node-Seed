/**
 * Created by a on 10/3/2015.
 */
"use strict";
/*
    Set of database auxiliaries, common implementation of ubiquitous actions
 */
/**
 *
 * @param dbSchema
 * @param id
 * @param aCallback
 */
exports.load = function(dbSchema, idName, idValue, aCallback){
  var qObject = {};
  qObject[idName] = idValue;
  dbSchema.findOne(qObject)
    .exec(aCallback);
};
/**
 *
 * @param dbSchema  name of the schena
 * @param options   object with members:
 *                  criteria (http://docs.mongodb.org/manual/reference/operator/query/),
 *                  select,
 *                  perPage (nuber of results per pae),
 *                  page (nuber of pages to skip from beginning)
 * @param aCallback functuin to execute upon result
 */
exports.lookup = function (dbSchema, options, aCallback) {
  var criteria = options.criteria || {};
  var query = dbSchema.find(criteria);
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
};
/**
 * Count surveys
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
exports.itemCount = function (dbSchema, options, aCallback) {
  var criteria = options.criteria || {};
  dbSchema.count(criteria)
    .exec(aCallback);
};
/**
 *
 * @param mongoose
 * @param schemaModelName
 * @param id
 * @returns {Promise}
 */
exports.getLoadPromise = function(mongoose, schemaModelName, id){
  var loadPromise = new Promise(function(resolve, reject){
    var AModel = mongoose.model(schemaModelName);
    AModel.load(id, function(err, result) {
      if (err)
        reject(err);
      else
        resolve(result);
    });
  });
  return loadPromise;
};
/**
 *
 * @param mongoose
 * @param schemaModelName
 * @param options
 * @returns {Promise}
 */
exports.getLookupPromise = function(mongoose, schemaModelName, options){
  var loadPromise = new Promise(function(resolve, reject){
    var AModel = mongoose.model(schemaModelName);
    AModel.lookup(options, function(err, resultSet) {
      if (err)
        reject(err);
      else
        resolve(resultSet);
    });
  });
  return loadPromise;
};
/**
 *
 * @param mongoose
 * @param schemaModelName
 * @param options
 * @returns {Promise}
 */
exports.getItemCountPromise = function(mongoose, schemaModelName, options){
  var loadPromise = new Promise(function(resolve, reject){
    var AModel = mongoose.model(schemaModelName);
    AModel.itemCount(options, function(err, resultSet) {
      if (err)
        reject(err);
      else
        resolve(resultSet);
    });
  });
  return loadPromise;
};
/**
 *
 * @param mongoose
 * @param schemaModelName
 * @param saveData
 * @returns {Promise}
 */
exports.getSavePromise = function(mongoose, schemaModelName, saveData){
  var savePromise = new Promise(function(resolve, reject){
    var AModel = mongoose.model(schemaModelName);
    var saveInstance = new AModel(saveData);
    saveInstance.save(function (err) {
      if (err)
        reject(err);
      else
        resolve(saveInstance);
    });
  });
  return savePromise;
};
