'use strict';

class Model {

  /**
   * 
   * @param {object} schema 
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Gets a database entry by id
   * @param {integer} _id 
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }

  /**
   * Creates new database entry by id
   * @param record {object}
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
   * Updates existing database object by id
   * @param _id {integer}
   * @param record {object}
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }

  /**
   * Removes existing database object by id
   * @param _id {integer}
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;