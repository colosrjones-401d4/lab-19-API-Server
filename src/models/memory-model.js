'use strict';

const uuid = require('uuid/v4');

class Model {
  /**
   * @param {*} schema 
   */
  constructor(schema) {
    this.schema = schema;
    this.database = [];
  }

  /**
   * Validates data entry
   * @param {object} entry 
   */
  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach( field => {
      if ( this.schema[field].required ) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });
    
    return valid ? record : undefined;
  }
  
  /**
   * Gives a count of the database length
   */
  count() {
    return this.database.length;
  }

  /**
   * Get information from database
   * @param id {integer}
   */
  get(id) {
    const records = id ? this.database.filter( (record) => record._id === id ) : this.database;
    return Promise.resolve(records);
  }

  /**
   * Post entry to the database
   * @param entry {object}
   */
  post(entry) {
    entry._id = uuid();
    let record = this.sanitize(entry);
    if ( record._id ) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   * Delete an entry by id
   * @param id {integer}
   */
  delete(id) {
    this.database = this.database.filter((record) => record._id !== id );
    return this.get(id);
  }

  /**
   * Update a database entry
   * @param id {integer}
   * @param entry {object}
   */
  put(id, entry) {
    let record = this.sanitize(entry);
    if( record._id ) { this.database = this.database.map((item) => (item._id === id) ? record : item  ); }
    return this.get(id);
  }
  
}

module.exports = Model;