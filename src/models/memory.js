'use strict';

const uuid = require('uuid/v4');

class Model {

  /**
   * 
   * constructor set to database that equals to an empty array
   * 
   * @param
   * @constructor
   */
  constructor() {
    this.database = [];
  }

  /**
   *
   * gets record from database
   * 
   * @param {*} id
   * @returns resolved promise
   */
  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  /**
   *
   * creates an entry for record, then pushes record into the database
   *
   * @param {*} entry
   * @returns resolved promise
   */

  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   *
   * updates entry in the databse by suing its id
   *
   * @param {*} id
   * @param {*} entry
   * @returns resolved promise
   */

  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  /**
   *
   * deletes record form the database by usiong the id
   *
   * @param {*} id
   * @returns resolved promise
   */

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  /**
   *
   * 
   *
   * @param {*} entry
   * @returns Object
   */

  sanitize(entry) {

    let valid = true;
    let record = {};
    let schema = this.schema();

    Object.keys(schema).forEach(field => {
      if (schema[field].required) {
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

}

module.exports = Model;
