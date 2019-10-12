'use strict';

const Q = require('../app.js').Q;
/** Class representing a generic mongo model. */
class Model {

  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Retrieves one or more records
   * @param _id {string} optional mongo record id
   * @returns {*}
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    Q.publish('database', 'read', {action:'get'});
    return this.schema.find(queryObject);
  }

  /**
   * Create a new record
   * @param record {object} matches the format of the schema
   * @returns {*}
   */
  post(record) {
    let newRecord = new this.schema(record);
    Q.publish('database', 'create', {action:'post',id:newRecord.id});
    return newRecord.save();
  }

  /**
   * Replaces a record in the database
   * @param _id {string} Mongo Record ID
   * @param record {object} The record data to replace. ID is a required field
   * @returns {*}
   */
  put(_id, record) {
    Q.publish('database', 'update', {action:'put',id:_id});
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }

  /**
   * Deletes a recod in the model
   * @param _id {string} Mongo Record ID
   * @returns {*}
   */
  delete(_id) {
    Q.publish('database', 'delete', {action:'delete',id:_id});
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;