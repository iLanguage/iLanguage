(function(exports) {

  var FieldDBDatabase = require('fielddb/api/corpus/Database').Database;

  var Database = function Database(options) {
    // console.log("In Database ", options);
    FieldDBDatabase.apply(this, arguments);
  };

  var DEFAULT_COLLECTION_MAPREDUCE = '_design/pages/_view/COLLECTION?descending=true&limit=10';
  Database.prototype = Object.create(FieldDBDatabase.prototype, /** @lends Database.prototype */ {
    constructor: {
      value: Database
    }
  });

  console.log(Database);
  exports.Database = Database;

})(typeof exports === 'undefined' ? this['Database'] = {} : exports);
